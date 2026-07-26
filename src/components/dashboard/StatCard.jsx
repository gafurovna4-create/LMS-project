import React from 'react'

function StatCard({
    title,
    value,
    description,
    icon: Icon,
}) {
    return (
        <div className='rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-gray-500'>{title}</p>
                    <h2 className='mt-2 text-3xl font-bold'>{value}</h2>
                    <p className='mt-1 text-sm text-gray-400'>{description}</p>
                </div>

                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}>
                    <Icon size={28} />
                </div>
            </div>
        </div>
    )
}

export default StatCard
