{include file="books_user_menu.tpl"}
<div class="search">{$search}</div>
<div id="content">
    <div class="pagerTop">{$pager}</div>
    <div class="page">
        <div class="mainTitle">{$school.schoolType} {$school.schoolName} - {$school.schoolCity}</div>
        <hr />
        <div class="showState">{include file="books_user_showState.tpl"}</div>
        <table width="100%">
            {foreach item=books from=$books}
            <tr>
                <td valign="top">
                    <div class="bookTitle" title="{gt text='Accés al llibre'}">
                        <a href="{$bookSoftwareUrl}/{$books.schoolCode}_{$books.bookId}/llibre" target="_blank">
                            {$books.bookTitle}
                        </a>
                    </div>
                </td>
                <td valign="top">
                    <div class="blocSchool" title="{gt text='Data de creació'}">
                        {getDateFormat format=d/m/Y date=$books.bookDateInit}
                    </div>
                </td>
                <td valign="top" width="24%">
                    <div class="blocSchool" title="{gt text='Administrador/a'}">
                        {$books.bookAdminName}
                    </div>
                </td>
                <td valign="top" width="20">
                    <div class="blocSchool" title="{gt text='Nombre de pàgines'}">
                        {$books.bookPages}
                    </div>
                </td>
                <td valign="top" width="2" align="right">
                    <div class="info">
                        <a href="#" onclick="javascript:showBookData({$books.bookId})">
                            {gt text='Mostra la fitxa del llibre' assign=alt}
                            {img modname=Books src=folder.gif altml=true titleml=true alt=$alt title=$alt}
                        </a>
                    </div>
                </td>
                {userloggedin assign=userid}
                {if $userid neq ''}
                <td valign="top" align="right" width="2">
                    <div class="info">
                        <a href="javascript:addPrefer({$books.bookId})">
                            {gt text='Afegeix als llibres preferits' assign=alt}
                            {img modname=Books src=prefer.gif altml=true titleml=true alt=$alt title=$alt}
                        </a>
                    </div>
                </td>
                {/if}
                {if $canComment}
                <td valign="top" align="right" width="2">
                    <div class="info">
                        <a href="#" onclick="javascript:addComment('{$books.bookId}',2)">
                            {gt text='Afegeix un comentari' assign=alt}
                            {img modname=Books src=comment.gif altml=true titleml=true alt=$alt title=$alt}
                        </a>
                    </div>
                </td>
                {if $books.bookAdminName eq $userName || $userName eq $books.schoolCode}
                <td valign="top" align="right" width="2">
                    <div class="info">
                        <a href="index.php?a=edit&amp;bookId={$books.bookId}">
                            {gt text='Edita les característiques del llibre' assign=alt}
                            {img modname=Books src=editfolder.gif altml=true titleml=true alt=$alt title=$alt}
                        </a>
                    </div>
                </td>
                {if $books.bookAdminName eq $userName}
                <td valign="top" align="right" width="2">
                    <div class="info">
                        <a href="index.php?a=new_publi&amp;bookId={$books.bookId}">
                            {gt text='Publicita el teu llibre' assign=alt}
                            {img modname=Books src=publi.gif altml=true titleml=true alt=$alt title=$alt}
                        </a>
                    </div>
                </td>
                {/if}
                {/if}
                {/if}
                <td valign="top" width="2" align="right">
                    <div class="info">
                        <a href="rss/{$books.schoolCode}_{$books.bookId}.xml" target="_blank">
                            {gt text='Subscriu-te a aquest llibre' assign=alt}
                            {img modname=Books src=feed.gif altml=true titleml=true alt=$alt title=$alt}
                        </a>
                    </div>
                </td>			
            </tr>
            {/foreach}
        </table>
    </div>
    <div class="pagerBottom">{$pager}</div>
</div>