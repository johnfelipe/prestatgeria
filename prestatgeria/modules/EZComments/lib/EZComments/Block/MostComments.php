<?php
/**
 * EZComments
 *
 * @copyright (C) EZComments Development Team
 * @link http://code.zikula.org/ezcomments
 * @license See license.txt
 */

class EZComments_Block_MostComments extends Zikula_Controller_AbstractBlock
{
    /**
     * initialise block
     */
    public function init()
    {
        // Security
        SecurityUtil::registerPermissionSchema('EZComments:MostCommentsBlock:', 'Block ID::');
    }

    /**
     * get information on block
     *
     * @return array       The block information
     */
    public function info()
    {
        return array('module'          => 'EZComments',
                     'text_type'       => $this->__('MostComments'),
                     'text_type_long'  => $this->__('Show content with most comments'),
                     'allow_multiple'  => true,
                     'form_content'    => false,
                     'form_refresh'    => false,
                     'show_preview'    => true,
                     'admin_tableless' => true);

    }

    /**
     * display block
     *
     * @param array       $blockinfo     a blockinfo structure
     * @return output      the rendered bock
     */
    public function display($blockinfo)
    {
        // Security check
        if (!SecurityUtil::checkPermission('EZComments:MostCommentsBlock:', "$blockinfo[bid]::", ACCESS_READ)) {
            return false;
        }

        if (!ModUtil::load('EZComments')) {
            return false;
        }

        // Get variables from content block
        $vars = BlockUtil::varsFromContent($blockinfo['content']);

        // Defaults
        if (!isset($vars['numentries'])) {
            $vars['numentries'] = 5;
        }

        if (!isset($vars['showcount'])) {
            $vars['showcount'] = false;
        }

        $options = array('numitems' => $vars['numentries']);

        if (isset($vars['mod']) && $vars['mod'] != '*') {
            $options['mod'] = $vars['mod'];
        }

        // get the comments
        $items = $this->MostCommentsBlock_getall($options);

        // augment the info
        $comments = ModUtil::apiFunc('EZComments', 'user', 'prepareCommentsForDisplay', $items);

        $this->view->assign($vars);
        $this->view->assign('comments', $comments);

        // Populate block info and pass to theme
        $blockinfo['content'] = $this->view->fetch('ezcomments_block_mostcomments.tpl');

        return BlockUtil::themesideblock($blockinfo);
    }


    /**
     * modify block settings
     *
     * @param array $blockinfo a blockinfo structure
     * @return output the bock form
     */
    public function modify($blockinfo)
    {
        if (!SecurityUtil::checkPermission('EZComments:MostCommentsBlock:', "$blockinfo[bid]::", ACCESS_ADMIN)) {
            return false;
        }

        // Get current content
        $vars = BlockUtil::varsFromContent($blockinfo['content']);

        // Defaults
        if (!isset($vars['numentries'])) {
            $vars['numentries'] = 5;
        }

        if (!isset($vars['showcount'])) {
            $vars['showcount'] = false;
        }

        $options = array('numitems' => $vars['numentries']);

        if (isset($vars['mod']) && $vars['mod'] != '*') {
            $options['mod'] = $vars['mod'];
        }

        // get all modules with EZComments active
        $usermods = array();
        $usermods = ModUtil::apiFunc('Modules', 'admin', 'gethookedmodules', array('hookmodname'=> 'EZComments'));

        // assign the block vars
        $this->view->assign($vars);

        $this->view->assign('usermods', array_keys($usermods));

        // Return the output that has been generated by this function
        return $this->view->fetch('ezcomments_block_mostcomments_modify.tpl');
    }

    /**
     * update block settings
     *
     * @param array       $blockinfo     a blockinfo structure
     * @return $blockinfo  the modified blockinfo structure
     */
    public function update($blockinfo)
    {
        // Get current content
        $vars = BlockUtil::varsFromContent($blockinfo['content']);

        // alter the corresponding variable
        $vars['mod']          = (string)FormUtil::getPassedValue('mod', '', 'POST');
        $vars['numentries']   =    (int)FormUtil::getPassedValue('numentries', 5, 'POST');
        $vars['showcount'] =   (bool)FormUtil::getPassedValue('showcount', false, 'POST');

        // write back the new contents
        $blockinfo['content'] = BlockUtil::varsToContent($vars);

        // clear the block cache
        $this->view->clear_cache('ezcomments_mostcommentsblock_ezcomments.tpl');

        return $blockinfo;
    }

    public function MostCommentsBlock_getall($args = array())
    {
        if (!isset($args['numitems']) || !is_numeric($args['numitems'])) {
            $args['numitems'] = -1;
        }

        // Security check
        if (!SecurityUtil::checkPermission('EZComments::', '::', ACCESS_OVERVIEW)) {
            return array();
        }

        // Get database setup
        $pntable = pnDBGetTables();
        $table = $pntable['EZComments'];
        $columns = &$pntable['EZComments_column'];

        // form where clause
        $whereclause = array();

        if (isset($args['mod'])) {
            $whereclause[] = "$columns[modname] = '" . DataUtil::formatForStore($args['mod']) . "'";
        }

        // create where clause
        $where = '';
        if (!empty($whereclause)) {
            $where = implode(' AND ', $whereclause).' and ';
        }

        $permFilter[] = array('component_left'   => 'EZComments',
                              'component_middle' => '',
                              'component_right'  => '',
                              'instance_left'    => 'modname',
                              'instance_middle'  => 'objectid',
                              'instance_right'   => 'id',
                              'level'            => ACCESS_READ);

        $cols = DBUtil::_getAllColumns('EZComments'); // FIXME: don't need all
        $ca = DBUtil::getColumnsArray('EZComments');
        $ca[] = "count";
        $sql = "
    SELECT DISTINCT
           $cols,
           count(*) as count
    FROM $table
    where $where $columns[status] = 0
    group by $columns[modname],$columns[objectid]
    order by count desc
    ";

        $dbresult = DBUtil::executeSQL($sql, 0, $args['numitems']);

        $items = DBUtil::marshallObjects($dbresult, $ca);

        // backwards compatibilty: modname -> mod
        foreach (array_keys($items) as $k) {
            $items[$k]['mod'] = $items[$k]['modname'];
        }

        // return the items
        return $items;
    }
}