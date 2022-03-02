

                    function setCookie(cname,cvalue,exdays){
                        var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toUTCString();cvalue=encodeURIComponent(cvalue);document.cookie=cname+"="+cvalue+"; "+expires+"; path=/; domain=www.autorecupero.it";
                    }
                    function getCookie(cname){
                        var name=cname+"=";var ca=document.cookie.split(";");
                        for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==" ")c=c.substring(1);if(c.indexOf(name)==0)return decodeURIComponent(c.substring(name.length,c.length));
                        }
                    return "";}    

// QUESTO E' DALLA PAGINA DEL RICAMBIO
function invia_annuncio() {
    if (document.myForm.TELEFONO.value == "") { $("#alert_valorizzazione_campi").collapse("show"); }
    else if (document.myForm.MAIL.value == "") { $("#alert_valorizzazione_campi").collapse("show"); }
    else if (!document.getElementById("ACCETTAZIONE_CONDIZIONI_CONTRATTUALI").checked) { $("#alert_valorizzazione_campi").collapse("show"); }
    else {
        $("#alert_valorizzazione_campi").collapse({ 'toggle': false }).collapse('hide');;

        nascondi_form_messaggio_a_demolitore();
        document.getElementById("caricamento_invio_richiesta").style.display = "block";
        $.ajaxSetup({ contentType: "application/json; charset=windows-1252" });
        var cvalue = "yes"; var exdays = "365";
        if (getCookie("letto_info_cookie") == "yes") {
            setCookie("TELEFONO", document.getElementById("input_telefono").value, exdays);
            setCookie("MAIL", document.getElementById("input_mail").value, exdays);
            if (document.getElementById("ACCETTAZIONE_PUBBLICITA").checked) {
                setCookie("ACCETTAZIONE_PUBBLICITA", 1, exdays);
            }
            else { setCookie("ACCETTAZIONE_PUBBLICITA", 0, exdays); }
            setCookie("ACCETTAZIONE_CONDIZIONI_CONTRATTUALI", 1, exdays);
        }
    }