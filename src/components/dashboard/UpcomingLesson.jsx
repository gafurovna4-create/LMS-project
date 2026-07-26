import React from 'react'

function UpcomingLesson() {
    return (
        <div className='rounded=xl bg-white max-h-125 overflow-y-auto shadow-sm'>
            <h2 className='mb-5 text-xl font-semibold'>
                Upcoming Lessons
            </h2>

            <div className='space-y-4'>
                {lessons.map((lesson) => (
                    <div key={lesson.id} className='rounded-lg border p-4'>
                        <p className='text-lg font-semibold'>
                            {lesson.title}
                        </p>

                        <p className='text-gray-500'>
                            {lesson.time}
                        </p>

                        <p className='text-sm text-gray-400'>
                            {lesson.room}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UpcomingLesson
