<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Books extends Model
{
    use SoftDeletes, Notifiable;

    protected $table = 'books';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'author_id', 'name', 'detail'
    ];


    public function userzz()
    {
        return $this->belongsTo('App\User', 'id', 'author_id')->withTrashed();
    }
}
