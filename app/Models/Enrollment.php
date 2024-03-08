<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    use HasFactory;

    protected $table = 'enrollments';
    protected $primaryKey = 'enrollments_id';
    protected $fillable = [
        'students_id',
        'courses_id',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'students_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'courses_id');
    }
    
}
