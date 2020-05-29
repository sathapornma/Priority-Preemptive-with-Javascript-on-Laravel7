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
            <button type="submit" class="btn btn-success" onclick="$('#myForm').submit()">Save</button>
        </div>
    </div>
    <hr>
    <h4>Gantt Chart</h4>
    <div class="progress"></div>
    <br><br>
    <form id="myForm" action="{{url('/')}}" method="post">
        {{ csrf_field() }}
        <b >Total Process : </b><input class="dis" id="totalprocess" value="-" name="amount"><br>
        <b >CPU Time : </b><input class="dis" id="cpuStartTime" value="-"><br>
        <b >CPU End Time : </b><input class="dis" id="cpuEndTime" value="-"><br>
        <b >CPU Status : </b><span class="dis" id="cpuStatus"> - </span><br>
        <hr>
        <b >Turn Around Time : </b><input class="dis" id="TurnAroundTime" value="-" name="avt">&nbsp; &nbsp;
        <b >Waiting Time : </b><input class="dis" id="WaitingTime" value="-" name="awt">
    </form>
@endsection
