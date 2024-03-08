<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;
    protected $table = 'courses';
    protected $primaryKey = 'courses_id';

    protected $fillable = [
        'courses_id',
        'course_name',
        'start_date',
        'end_date',
    ];

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'courses_id');
    }
    



}
