<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';
    protected $primaryKey = 'students_id';
    protected $fillable =[
        'students_fname',
        'students_lname',
        'students_email',
        'students_address',
        'students_contact',
        'students_dob',
        'students_gender',

    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'enrollments', 'students_id', 'courses_id');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'students_id');
    }

}
