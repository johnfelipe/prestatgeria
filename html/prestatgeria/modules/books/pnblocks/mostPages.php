<?php
function books_mostpagesblock_init()
{
    pnSecAddSchema("books:mostpagesblock:", "Block title::");
}

function books_mostpagesblock_info()
{
	$dom = ZLanguage::getModuleDomain('Books');
	
    return array('text_type' => 'mostPages',
					'module' => 'books',
					'text_type_long' => __('Mostra els llibres amb més pàgines',$dom),
					'allow_multiple' => true,
					'form_content' => false,
					'form_refresh' => false,
					'show_preview' => true );
}

/**
 * Show the list of forms for choosed categories
 * @autor:	Albert Pérez Monfort
 * return:	The list of forms
*/
function books_mostpagesblock_display($blockinfo)
{
	// Security check
	if (!pnSecAuthAction(0, "books:mostpagesblock:", $blockinfo['title']."::", ACCESS_READ)) { 
		return; 
	} 

	// Check if the module is available
	if(!pnModAvailable('books')){
		return;
	}

	$books = pnModAPIFunc('books','user','getAllBooks', array('init' => 0,
										'ipp' => 5,
										'order' => 'bookPages',
										'notJoin' => 1));
	foreach($books as $book){
		$booksArray[] = array('bookPages' => $book['bookPages'],
						'bookTitle' => $book['bookTitle'],
						'bookId' => $book['bookId']);
	}

	// Create output object
	$pnRender = pnRender::getInstance('books',false);
	$pnRender -> assign('books',$booksArray);

	$s = $pnRender -> fetch('books_block_mostPages.htm');

	// Populate block info and pass to theme
	$blockinfo['content'] = $s;

	return themesideblock($blockinfo);
}