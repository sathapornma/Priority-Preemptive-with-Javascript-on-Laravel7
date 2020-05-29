@extends('layouts/structure')
@section('title', 'History')
@section('head')
@endsection

@section('content')
    <br><br>
    <h2 class="text-center">History of Processing</h2>
    <div class="text-right">
        <a class="btn btn-warning" href="/">Home</a>
    </div>
    <br>
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped table-dark text-center">
                    <thead class="thead-dark">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">AMOUNT</th>
                          <th scope="col">AVT</th>
                          <th scope="col">AWT</th>
                        </tr>
                      </thead>
                      <tbody>
                        @foreach($hists as $row) 
                            <tr>
                                <th scope="row">{{$row['id']}}</th>
                                <td>{{$row['amount']}}</td>
                                <td>{{$row['avt']}}</td>
                                <td>{{$row['awt']}}</td>
                            </tr>
                        @endforeach
                      </tbody>
                </table>
            </div>
        </div>
    </div>
    <hr>
@endsection
