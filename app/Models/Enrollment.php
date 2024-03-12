<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Enrollment extends Model
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        'course_id',
    ];

    public function student():BelongsTo
    {
        return $this->belongsTo(Student::class ,  'student_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class,  'course_id');
    }

}
