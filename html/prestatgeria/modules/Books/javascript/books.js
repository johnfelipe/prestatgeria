function failure() {
    
}

function showBookData(a){
    wait();
    var b={
        bookId:a
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=showBookData",{
        parameters:b,
        onComplete:showBookData_response,
        onFailure: failure
    });
}

function showBookData_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("theme_content").update(b.content);
}

function catalogue(a,aa,aaa,aaaa,aaaaa){
    wait();
    var b={
        order:a,
        filter:aa,
        init:aaa,
        filterValue:aaaa,
        history:aaaaa
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=catalogue",{
        parameters:b,
        onComplete:catalogue_response,
        onFailure: failure
    });
}

function catalogue_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("theme_content").update(b.content);
}

function wait(){
    $("theme_content").update('<center><img src="' + Zikula.Config.baseURL + 'modules/books/images/wait.gif" /></center>');
}

function addPrefer(a){
    var b={
        bookId:a
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=addPrefer",{
        parameters:b,
        onComplete:addPrefer_response,
        onFailure: failure
    });
}

function addPrefer_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("prefered").update(b.content);
}

function delPrefer(a){
    var b={
        bookId:a
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=delPrefer",{
        parameters:b,
        onComplete:delPrefer_response,
        onFailure: failure
    });
}

function delPrefer_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $('bookPrefered_' + b.bookId).toggle();
}

function addComment(a,aa){
    var b={
        bookId:a,
        history:aa
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=addComment",{
        parameters:b,
        onComplete:addComment_response,
        onFailure: failure
    });
    
}

function addComment_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("theme_content").update(b.content);
}

function sendComment(){
    var f = document.sendC;
    var a = f.bookId.value;
    var aa = f.commentText.value
    var aaa = f.history.value
    var b={
        bookId:a,
        commentText:aa,
        history:aaa
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=sendComment",{
        parameters:b,
        onComplete:sendComment_response,
        onFailure: failure
    });
}

function sendComment_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("theme_content").update(b.content);
}

function collections(bookId){
    wait();
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=collections",{
        onComplete:collections_response,
        onFailure: failure
    });
}

function collections_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("theme_content").update(b.content);
}

function searchReload(a,aa,aaa){
    $("searchIcon").update('<img src="' + Zikula.Config.baseURL + 'modules/books/pnimages/wait.gif" />');
    var b={
        filter:a,
        filterValue:aa,
        order:aaa
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=searchReload",{
        parameters:b,
        onComplete:searchReload_response,
        onFailure: failure
    });
}

function searchReload_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("search").update(b.content);
}

function autocompleteSearch(a,aa,aaa){
    if(aa.length > 2){
        var b={
            filter:a,
            value:aa,
            order:aaa
        };
        var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=autocompleteSearch",{
            parameters:b,
            onComplete:autocompleteSearch_response,
            onFailure: failure
        });
    }else{
        hideAutoCompleteSearch();
    }
}

function autocompleteSearch_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    if(b.count > 0){
        showAutoCompleteSearch();
        $("autocompletediv").update(b.values);
    }else{
        hideAutoCompleteSearch();
    }
}

function hideAutoCompleteSearch(){
    $('autocompletediv').style.visibility = "hidden";
}

function showAutoCompleteSearch(){
    $('autocompletediv').style.visibility = "visible";
}

function add(value){
    document.searchForm.filterValue.value = value;
    $("autocompletediv").update('');
    $('autocompletediv').style.visibility = "hidden";
}

classic1 = new Image();
classic1.src = "../llibre/themes/classic/view.png";
workbook1 = new Image();
workbook1.src = "../llibre/themes/workbook/view.png";
modern1 = new Image();
modern1.src = "../llibre/themes/modern/view.png";
marble1 = new Image();
marble1.src = "../llibre/themes/marble/view.png";
leaves1 = new Image();
leaves1.src = "../llibre/themes/leaves/view.png";
stars1 = new Image();
stars1.src = "../llibre/themes/stars/view.png";


function changeImg(img1,img2){
    img1.src = eval(img2+'1').src;
}

function manage(){
    wait();
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=manage",{
        onComplete:manage_response,
        onFailure: failure
    });
}

function manage_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("theme_content").update(b.content);
}

function allowUser(a,aa){
    var b={
        task:a,
        userName:aa
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=showCreators",{
        parameters:b,
        onComplete:allowUser_response,
        onFailure: failure
    });
}

function allowUser_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("creatorsList").update(b.content);
}

function createNewBook(){
    var f=document.forms["newBook"];
    var error = false;
    if(f.tllibre.value == '' && f.importBook.checked == false){
        alert(noBookTitle);
        error = true;
    }
    if(f.importBook.checked && f.importFile.value == '' && !error){
        alert(noImportFile);
        error = true;
    }
    if(f.mailxtec.value == '' && !error){
        alert(noAdminUser);
        error = true;
    }
    if(!f.confirm[1].checked && !error){
        alert(noRulesAccepted);
        error = true;
    }
    if(!error){
        f.submit();
    }
}

function editExistingBook(){
    var f=document.forms["editBook"];
    var error = false;
    if(f.bookTitle.value == ''){
        alert(noBookTitle);
        error = true;
    }
    if(f.bookAdminName.value == '' && !error){
        alert(noAdminUser);
        error = true;
    }
    if(!error){
        f.submit();
    }
}

function exportBook(){
    if(document.forms["newBook"].importBook.checked){
        Element.removeClassName('importFile', 'z-hide');
    }else{
        Element.addClassName('importFile', 'z-hide');
    }
    $('mainBookInfo').toggle();
}

function editDescriptor(a){
    var b={
        did:a
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=editDescriptor",{
        parameters:b,
        onComplete:editDescriptor_response,
        onFailure: failure
    });
}

function editDescriptor_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $('descriptor_' + b.did).update(b.content);
}

function updateDescriptor(did, value){
    var b={
        did:a,
        value:aa
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=updateDescriptor",{
        parameters:b,
        onComplete:updateDescriptor_response,
        onFailure: failure
    });
}

function updateDescriptor_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $('descriptor_' + b.did).update(b.content);
}

function deleteDescriptor(a){
    var b={
        did:a
    };
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=deleteDescriptor",{
        parameters:b,
        onComplete:deleteDescriptor_response,
        onFailure: failure
    });
}

function deleteDescriptor_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $('row_' + b.did).toggle();
}

function descriptors(){
    wait();
    var c=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Books&func=descriptors",{
        onComplete:descriptors_response,
        onFailure: failure
    });
}

function descriptors_response(a){
    if(!a.isSuccess()){
        Zikula.showajaxerror(a.getMessage());
        return;
    }
    var b=a.getData();
    $("theme_content").update(b.content);
}