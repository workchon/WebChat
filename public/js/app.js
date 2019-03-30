var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');
var socket = io('http://10.21.6.53:3000');
var uploader = new SocketIOFileClient(socket);
var form = document.getElementById('divChatbox');
var divChatbox = $('#divChatbox');

uploader.on('start', function(fileInfo) {
    console.log('Start uploading', fileInfo);
});
uploader.on('stream', function(fileInfo) {
    console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
});
//crea un boton en el mensaje con el nombre del archivo
uploader.on('complete', function(fileInfo) {
    console.log('Upload Complete', fileInfo);
    socket.emit('Archivo', '<button  onclick="GetFile(\'' + fileInfo.name + '\')">' + fileInfo.name + '</button>');
});
uploader.on('error', function(err) {
    console.log('Error!', err);
});
uploader.on('abort', function(fileInfo) {
    console.log('Aborted: ', fileInfo);
});

//evento de click del upload
document.getElementById("BtnUpload").onclick = function(ev) {
    ev.preventDefault();
    var fileEl = document.getElementById('file');
    var uploadIds = uploader.upload(fileEl, {
        data: { /* Arbitrary data... */ }
    });


    // setTimeout(function() {
    // uploader.abort(uploadIds[0]);
    // console.log(uploader.getUploadInfo());
    // }, 1000);
};
//Funcion para llamar al node el parametro es el nombre del archivo
function GetFile(name) {
    //cambia la ip deacuerdo ala compu servidor
    window.open('http://10.21.6.53:3000/Archivos?archivo=' + name + '');
}

function setFile(mensaje, yo) {
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += mensaje.boton;
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/8.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }


    divChatbox.append(html);

}