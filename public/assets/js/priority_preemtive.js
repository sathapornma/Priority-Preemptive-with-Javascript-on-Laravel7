var totalprocess = 0,
    maximum = 5,
    check = 1,
    pPrev = -1;
sPrev = '';
var color = ["#fc0303", "#fcba03", "#03fc07", "#03fcf0", "#fc03f4", "#ff8f8f"];
var cpuStartTime, cpuEndTime;
var proc, process = [];
var arrivaltime, brusttime, priority; // in array
var queue = [
    [0, 0, 0]
];
var sortEqual = [];

$(function() {
    addPro();
    addPro();
    //$(".progress").remove();
    // add process!
    $(".add-pro").click(function() {
        //console.log(p)
        addPro();
    });

    // remove process!
    $(".remove-pro").click(function() {
        removePro();
    });

    //run process
    $(".run-pro").click(function() {
        console.log("running");
        cpuStartTime = 0;
        cpuEndTime = 0;
        getDataProcess();

        //ganttChart();
        //console.log(proc);
        Timer = setInterval(function() { timeCounter() }, 1000);

    });
});

function addPro() {
    let process = "<input class='text-center' style='width:" + 40 + "px; background-color:" + color[totalprocess] + "' value='P" + totalprocess + "' disabled>";
    let status = "<input type='text' class='snew' id='status_" + totalprocess + " status' value='NEW' disabled>";
    let arr = "<input type='number' id='arr_" + totalprocess + "' value='0'>";
    let bru = "<input type='number' id='brust_" + totalprocess + "' value='0'>";
    let pri = "<input type='number' id='pri_" + totalprocess + "' value='1'>";

    let markup = "<tr>" +
        "<td>" + process + "</td>" +
        "<td>" + status + "</td>" +
        "<td>" + arr + "</td>" +
        "<td>" + bru + "</td>" +
        "<td>" + pri + "</td>" +

        +"</tr>";
    if (totalprocess < maximum) {
        $(".tprocess tbody").append(markup);
        totalprocess++;
    } else {
        alert("Sorry!! : Process is maximumimum " + maximum + ".");
    }
}

function removePro() {
    if (totalprocess > 0) {
        let c = confirm("You want delete?");
        if (c == true) {
            $(".tbprocess tr:last").remove();
            totalprocess--;
        }
    } else {
        alert("Sorry!! : Process is minimum " + totalprocess + ".");
    }
}

function getDataProcess() {

    proc = []; //Clear the process
    // get arrival ,brust ,pri
    // set CPU Time
    for (let i = 0; i < totalprocess; i++) {
        arrivaltime = parseInt($("#arr_" + i).val());
        brusttime = parseInt($("#brust_" + i).val());
        priority = parseInt($("#pri_" + i).val());

        cpuEndTime += brusttime; //set cpuStartTime by brust
        proc.push([arrivaltime, brusttime, priority, i]); // push to array

    }
    swapProcess();

}

function swapProcess() {

    process = []; //Clear the process
    let arrPrev;
    //Sort the process with arrival.
    proc.sort((a, b) => a[0] - b[0]);
    //Swap the process positions when arrival with equal values.
    arrPrev = proc[0][0];

    for (let i = 0; i < totalprocess; i++) {
        if (proc[i][0] == arrPrev)
            sortEqual.push(proc[i]);
        else {
            sortProcess();
            process.push(proc[i]);
        }
        arrPrev = proc[i][0];
    }

    process.sort((a, b) => a[0] - b[0]);
    console.log(process);
}

function sortProcess() {
    if (Array.isArray(sortEqual) && sortEqual.length) {
        sortEqual.sort((a, b) => a[2] - b[2]);
        for (let i = 0; i < sortEqual.length; i++) {
            process.push(sortEqual[i]);
        }
        sortEqual = [];
    }
}

function ganttChart(ct, pp) {
    let makeChart;
    makeChart = "<div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' style='width:" + ct + 10 + "%; background-color:" + color[pp] + "' aria-valuenow='" + ct + "' aria-valuemin=" + 0 + "' aria-valuemax='100'>" + ct + "</div>";
    $(".progress").append(makeChart);

}

function timeCounter() {
    if (cpuStartTime <= cpuEndTime) {
        $("#cpuStartTime").text(cpuStartTime);
        $("#cpuEndTime").text(cpuEndTime);
        $("#cpuStatus").html("<b class='text-warning'>Running...</b>");
        runProc(cpuStartTime);
        cpuStartTime++;

    } else {
        clearInterval(Timer);
        $("#cpuStatus").html("<b class='text-success'>Terminate !!</b>");
    }

}

function runProc(ct) {
    let i = ct;

    if (Array.isArray(queue) && queue.length) {
        if (i < totalprocess) {
            if (process[i][2] <= queue[0][2] || check == 1) {
                changeStatus(process[i][3], 'READY');
                process[i][1] -= 1; //pro brust time
                console.log("Time : " + ct + " P " + process[i][3]);
                ganttChart(ct, process[i][3]);
                changeStatus(process[i][3], 'RUNNING');
                if (process[i][1] != 0) {
                    //new queue
                    queue.push(process[i]);
                    queue.reverse();
                    queue.pop();

                    queue.sort((a, b) => a[2] - b[2]);
                } else {
                    changeStatus(process[i][3], 'TERMINATED');
                }
                check = 0;

            } else {
                queue[0][1] -= 1; //queue brust time
                console.log("Time : " + ct + " P " + queue[0][3]);
                ganttChart(ct, queue[0][3]);
                changeStatus(queue[0][3], 'RUNNING');
                if (queue[0][1] == 0) {
                    queue.reverse();
                    queue.pop();
                    changeStatus(queue[0][3], 'TERMINATED');
                }
                queue.push(process[i]);
                queue.sort((a, b) => a[2] - b[2]);
            }
        } else if (i >= totalprocess) {

            queue[0][1] -= 1; //queue brust time
            console.log("Time : " + ct + ", P" + queue[0][3]);
            ganttChart(ct, queue[0][3]);
            changeStatus(queue[0][3], 'RUNNING');

            if (queue[0][1] == 0) {
                queue.reverse();
                queue.pop();
                changeStatus(queue[0][3], 'TERMINATED');
            }
            queue.sort((a, b) => a[2] - b[2]);
        }

        console.log(queue);

    }
}

function changeStatus(p, s) {
    $("#status_" + p).attr('class', s);
    $("#status_" + p).val(s);

    pPrev = p;

}