// Copyright Zikula Foundation 2010 - license GNU/LGPLv3 (or at your option, any later version).
Zikula.define("Users");Zikula.Users.LoginBlock={init:function(){if($("authentication_select_method_form_users_uname")!=null){$("authentication_select_method_form_users_uname").observe("submit",function(a){Zikula.Users.LoginBlock.onSubmitSelectAuthenticationMethod(a,"authentication_select_method_form_users_uname")})}if($("authentication_select_method_form_users_email")!=null){$("authentication_select_method_form_users_email").observe("submit",function(a){Zikula.Users.LoginBlock.onSubmitSelectAuthenticationMethod(a,"authentication_select_method_form_users_email")})}},showAjaxInProgress:function(){var a=$("users_loginblock_login_form");if(!a.hasClassName("z-hide")){a.addClassName("z-hide")}a=$("users_loginblock_no_loginformfields");if(!a.hasClassName("z-hide")){a.addClassName("z-hide")}a=$("users_loginblock_h5_no_authentication_method");if(a.hasClassName("z-hide")){a.removeClassName("z-hide")}a=$("users_loginblock_h5_authentication_method");if(!a.hasClassName("z-hide")){a.addClassName("z-hide")}$$("form.authentication_select_method").invoke("removeClassName","z-hide");$("users_loginblock_waiting").removeClassName("z-hide")},showAjaxComplete:function(a){$("users_loginblock_waiting").addClassName("z-hide");var b;if(a){b=$("users_loginblock_login_form");if(!b.hasClassName("z-hide")){b.addClassName("z-hide")}b=$("users_loginblock_no_loginformfields");if(b.hasClassName("z-hide")){b.removeClassName("z-hide")}b=$("users_loginblock_h5_no_authentication_method");if(b.hasClassName("z-hide")){b.removeClassName("z-hide")}b=$("users_loginblock_h5_authentication_method");if(!b.hasClassName("z-hide")){b.addClassName("z-hide")}}else{b=$("users_loginblock_login_form");if(b.hasClassName("z-hide")){b.removeClassName("z-hide")}b=$("users_loginblock_no_loginformfields");if(!b.hasClassName("z-hide")){b.addClassName("z-hide")}b=$("users_loginblock_h5_no_authentication_method");if(!b.hasClassName("z-hide")){b.addClassName("z-hide")}b=$("users_loginblock_h5_authentication_method");if(b.hasClassName("z-hide")){b.removeClassName("z-hide")}}},onSubmitSelectAuthenticationMethod:function(c,d){Zikula.Users.LoginBlock.showAjaxInProgress();var a=$(d).serialize(true);a.form_type="loginblock";var b=new Zikula.Ajax.Request(Zikula.Config.baseURL+"ajax.php?module=Users&type=Ajax&func=getLoginFormFields",{parameters:a,onSuccess:Zikula.Users.LoginBlock.getSelectAuthenticationMethodResponse,onFailure:Zikula.Users.LoginBlock.selectAuthenticationMethodResponseFailure});c.stop()},getSelectAuthenticationMethodResponse:function(a){var b=a.getData();if(b){Element.update("users_loginblock_fields",b.content);$("users_loginblock_selected_authentication_module").setValue(b.modname);$("users_loginblock_selected_authentication_method").setValue(b.method);if(b.method!==false){$("authentication_select_method_form_"+b.modname.toLowerCase()+"_"+b.method.toLowerCase()).addClassName("z-hide")}Zikula.Users.LoginBlock.showAjaxComplete(false)}else{Zikula.Users.LoginBlock.showAjaxComplete(true)}},selectAuthenticationMethodResponseFailure:function(a){Zikula.Users.LoginBlock.showAjaxComplete(true);if(a.readyState!=0){Zikula.showajaxerror(a.getStatus()+": "+a.getMessage())}}};document.observe("dom:loaded",Zikula.Users.LoginBlock.init);