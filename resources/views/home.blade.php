@extends('layouts/structure')
@section('title', 'Home')
@section('head')
    <link rel="stylesheet" href="{{ asset('assets/css/home.css') }}">
    <script src="{{ asset('assets/js/priority_preemtive.js') }}"></script>
@endsection

@section('content')
    <br><br>
    <h2 class="text-center">Priority Preemptive</h2>
    <br>
    <div class="col-12">
        <div class="text-right">
            <a class="btn btn-warning" href="/history">History</a>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped table-dark text-center tprocess">
                    <thead>
                        <tr>
                            <th scope="col">Process</th>
                            <th scope="col">Status</th>
                            <th scope="col">Arrival Time</th>
                            <th scope="col">Burst Time</th>
                            <th scope="col">Priority</th>
                        </tr>
                    </thead>
                    <tbody class="tbprocess">
                    </tbody>
                </table>
            </div>
            <button class="btn btn-danger remove-pro">Remove Process</button>
            <button class="btn btn-primary add-pro">Add Process</button>
            <button class="btn btn-success run-pro">Run Process</button>
        </div>
    </div>
    <hr>
    <h4>Gantt Chart</h4>
    <div class="progress">
        
    </div>

    <div class="row">
        <div class="col-12">
            <div class="gantt-chart table-responsive">
                <table class="table table-striped table-dark text-center tchart">
                    <tbody>
                        <tr class="tgantt-chart"></tr>
                        <tr class="tnumgantt-chart"></tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
    
    <b >CPU Time : <span id="cpuStartTime"> - </span></b><br>
    <b >CPU End Time : <span id="cpuEndTime"> - </span></b><br>
    <b >CPU Status : <span id="cpuStatus"> - </span></b>
@endsection
