<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    use SoftDeletes, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'author_id', 'name', 'detail'
    ];
}
