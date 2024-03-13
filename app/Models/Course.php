<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Course extends Model
{
    //use HasFactory;
    protected $table = 'courses';
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
    ];

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }
    //relation to students
    public function students():BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'enrollments', 'course_id', 'student_id');
    }

}
