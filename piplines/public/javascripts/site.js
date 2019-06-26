var addTaskListener = () => {
    console.log('call addTaskListener');
    var formDelete = document.forms.runPipeline;
};
var Delete = (ev, form) => {
    const content = document.getElementById('content');
    url = 'tasks/delete';
    const body = 'id=' + encodeURIComponent(form.elements.id.value);
    loadAjax(url, body, content);
    ev.preventDefault();
};
var addListenerPipe =  () => {
    const formRun = document.forms.runPipeline;
    const formCalc = document.forms.calcAverageTime;
    formRun.addEventListener('submit', function (event) { runPipeline(event, formRun); });
    formCalc.addEventListener('submit', function (event) { calcAverage(event, formCalc); });
    console.log('Add listener for pipe');
};
var addListener = () => {
    const selectPipelines = document.getElementById('Pipelines');
    selectPipelines.addEventListener('change', function (event) { selectPipeline(event, this.value); });
    console.log('Add main listener');
};
var runPipeline =  (ev, form) => {
    const url = 'pipelines/runPipeline';
    const status = document.getElementById('message');
    const pipelineId = form.elements.id.value;
    const body = 'id=' + encodeURIComponent(pipelineId);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    status.innerHTML += '<div class="alert alert-primary role="alert"> Pipeline is run. Waiting...<div>';
    xhr.onreadystatechange =  () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            status.innerHTML += '<div class="alert alert-danger" role="alert">' + xhr.responseText + '<div>';
        } else {
            status.innerHTML += '<div class="alert alert-success" role="alert">'+xhr.responseText+'<div>';
        }
    };
    ev.preventDefault();
};
var calcAverage =  (ev, form) => {
    const url = 'pipelines/calcAverageTime';
    const body = 'id=' + encodeURIComponent(form.elements.id.value);
    const content = document.getElementById('AverageTime');
    loadAjax(url, body, content);
    ev.preventDefault();
};
var selectPipeline =  (ev, val) => {
    const content = document.getElementById('pipeline');
    if (+val === 1) {
        content.innerHTML = '';
        return;
    }
    const url = 'pipelines';
    const body = 'id=' + encodeURIComponent(val);
    loadAjax(url, body, content);
};
var addTask =  (ev, form) => {
    const content = document.getElementById('pipeline');
    const url = 'pipelines/addTask';
    const body = 'id=' + encodeURIComponent(form.elements.id.value) + '&TaskId=' + encodeURIComponent(form.elements.TaskId.value);
    loadAjax(url, body, content);
    ev.preventDefault();
};
var DeleteTask =  (ev, form) => {    
    const content = document.getElementById('pipeline');
    const url = 'pipelines/deleteTask';
    const body = 'id=' + encodeURIComponent(form.elements.id.value) + '&TaskId=' + encodeURIComponent(form.elements.TaskId.value);
    loadAjax(url, body, content);
    ev.preventDefault();
};
var loadAjax = (url, body, content) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            status.innerHTML += '<div class="alert alert-danger" role="alert">' + xhr.responseText + '<div>';
        } else {
            content.innerHTML = xhr.responseText;
            if (content.id === 'pipeline') {
                addListenerPipe();
            }
        }
    };
};