function maxchar(c,n) {
    var rep = c.replace(/<br>/gi,' ');
    var s = rep.split('');
    var r = '';
    for (var i=0; i<n; i++) {
        if(s[i] === undefined) { s[i] = ''; }
        r += s[i];
    }
   if(s.length>n) { return r+'...';} else { return r;}
}

function str_replace(find, replace, parent) {
     return parent.replace(find, replace);
}

function size(length) {
    if(length>1024 && length<1048576) {
        var kb = length/1024;
return kb.toFixed(1)+' KB';
    }
    if(length<=1024) {
        return length+' Byte'; }
}



function main() {
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    var message = xhttp.responseText; 
   
    body = new Array();
    bodyhtml ='';
    message.replace(/\{(.*?)\}/gi, function(match, p1) { return body.push(p1); });
 
    for(var i=0; i<body.length; i++) { bodyhtml+='<div class="list" tabindex="'+i+'">'+maxchar(body[i],20)+'<br><small style="color: gray;">'+size(body[i].length)+'</small></div>'; }
    
  
    document.getElementById('content').innerHTML = bodyhtml;
    document.getElementById('f1').innerText='About';
    document.getElementById('f2').innerText='OK';
    document.getElementById('f3').innerText='Exit';

   var selector = document.querySelectorAll('.list');
   for(var j=0; j<selector.length; j++) {
    selector[j].addEventListener('click', function() {
        
     
          document.getElementById('content').innerHTML = '<div class="padding7">'+body[this.tabIndex]+"</div>";
          document.getElementById('content').style='overflow-y: scroll'; 
          document.getElementById('f1').innerText='Send';
        document.getElementById('f2').innerText='Edit';
        document.getElementById('f3').innerText='Back';
     
        document.body.removeEventListener('keydown', keydownmain);
         document.body.addEventListener('keydown', keydownmessage);
         
     
    });
   }
   if (localStorage.getItem('listfocused') != null) { document.querySelectorAll('.list')[localStorage.getItem('listfocused')].focus(); } else { document.querySelectorAll('.list')[0].focus(); }
    document.body.addEventListener('keydown', keydownmain);
    }
};
xhttp.open('GET', 'res.txt', true);
xhttp.send();


}

function keydownmain(e) {
    switch(e.key) {
        case 'ArrowDown': focus(1);
        break; 
        case 'ArrowUp': focus(-1);
        break;
        case 'Down': focus(1);
        break; 
        case 'Up': focus(-1);
        break;
        case 'Enter': document.activeElement.click();
        break;
        case 'SoftLeft': alert('An Smssender App By Triple Three, Code & Design By A.I. Shifat (shifat100)');
        break;
        case 'F1': alert('An Smssender App By Triple Three, Code & Design By A.I. Shifat (shifat100)');
        break;
        case 'SoftRight': window.close(); localStorage.removeItem('listfocused');
        break;
        case 'F2': window.close(); localStorage.removeItem('listfocused');
        break;
}



 function focus(move) {
            var currentIndex = document.activeElement.tabIndex;
            var next = currentIndex + move;
             if (next > document.querySelectorAll('.list').length-1) { next = 0; } else if ( next < 0) { next = document.querySelectorAll('.list').length-1; }
            var items = document.querySelectorAll('.list');
            var targetElement = items[next];
            targetElement.focus();
            localStorage.setItem('listfocused', next);
        }
 
  }





  function keydownmessage(e) {
    switch(e.key) {
        case 'ArrowDown': document.getElementsByClassName('padding7')[0].focus();
        break; 
        case 'ArrowUp': document.getElementsByClassName('padding7')[0].focus(); 
        break;
        case 'Down': document.getElementsByClassName('padding7')[0].focus();
        break; 
        case 'Up': document.getElementsByClassName('padding7')[0].focus();
        break;
        case 'Enter': if(document.getElementsByClassName('padding7')[0].contentEditable == 'true') { 
            document.getElementsByClassName('padding7')[0].contentEditable='false';
            document.getElementById('f2').innerText='Edit';
            document.getElementsByClassName('padding7')[0].blur(); 
        } else {
            document.getElementsByClassName('padding7')[0].contentEditable='true';
            document.getElementById('f2').innerText='Done';
            document.getElementsByClassName('padding7')[0].focus();
            } 

        break;
        case 'SoftRight': window.location.reload(); //main(); 
        break;
        case 'F2': window.location.reload(); //main();
        break;
        case 'SoftLeft': document.getElementsByClassName('padding7')[0].contentEditable='false'; send(document.getElementsByClassName('padding7')[0].innerText);  
        break;
        case 'F1': document.getElementsByClassName('padding7')[0].contentEditable='false'; send(document.getElementsByClassName('padding7')[0].innerText); 
        break;
}
  }



function send(val) {
var msg = val.replace(/\n/gi, '%0a');

   var destination = prompt('Enter Your Destination: ','');
    var a = document.createElement('a');
    a.href = 'sms:'+destination+'?body='+msg;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}









window.onload=main;