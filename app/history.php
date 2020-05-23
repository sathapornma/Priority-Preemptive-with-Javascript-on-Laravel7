<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class history extends Model
{
    //avt= average turn around time 
    //awt= average  waiting time
    protected $fillable = ['id','amount','avt','awt','created_at'];
}
