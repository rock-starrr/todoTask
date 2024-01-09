import Image from 'next/image'
import { Inter } from 'next/font/google'
import { AddTodo } from "@/components/Modals/AddTodo";
import { getData, setCompletedTodo } from "@/lib/Slices/TodoSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaDotCircle } from "react-icons/fa";
import { EditTodoModal } from "@/components/Modals/EditTodoModal";
import { DeleteTodomodal } from "@/components/Modals/DeleteTodomodal";
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import dynamic from 'next/dynamic';

const CustomEditor = dynamic(() => {
    return import('@/components/custom-editor');
}, { ssr: false });

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useDispatch()
    const { todos } = useSelector((state) => state.todo)

    useEffect(() => {
        dispatch(getData())
    }, [])

    const todoCard = todos.map((todo) =>
        <div key={todo?.id} className="p-4">
            <div className="max-w-sm p-6 bg-white border shadow-md sm:rounded border-gray-200 rounded-xl  dark:bg-gray-800 dark:border-gray-700">
                <div>
                     <div
                         className="mb-2 line-clamp-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        {todo?.title}
                    </div>
                </div>
                <p className="mb-2 items-start flex text-sm text-gray-700 dark:text-gray-400 line-clamp-1">
                    Status:
                    {todo?.status === 'Todo' &&
                        <span className={`text-[#656F7D] text-xs p-1`}>
                            <FaDotCircle />
                        </span>
                    }
                    {todo?.status === 'Starting soon' &&
                        <span className={`text-[#88b2be] text-xs p-1`}>
                            <FaDotCircle />
                        </span>
                    }
                    {todo?.status === 'In progress' &&
                        <span className={`text-[#40A5E5] text-xs p-1`}>
                            <FaDotCircle />
                        </span>
                    }
                    {todo?.status === 'In QA' &&
                        <span className={`text-[#7F77F1] text-xs p-1`}>
                            <FaDotCircle />
                        </span>
                    }
                    {todo?.status === 'Completed' &&
                        <span className={`text-[#33A069] text-xs p-1`}>
                            <FaDotCircle />
                        </span>
                    }
                    <span className="line-clamp-1">{todo?.status}</span>
                </p>
                <div className="flex space-x-2 w-1/2">
                    <EditTodoModal id={todo?.id} />
                    <DeleteTodomodal id={todo?.id} />
                </div>
                <div>
                    <button
                        className="bg-green-700 mt-1 mr-1 p-1 pl-3 pr-3 text-white rounded-full outline-none text-sm ext-center dark:bg-green-500 disabled:bg-green-500 dark:disabled:bg-green-300"
                        type="button"
                        disabled={todo?.status === 'Completed'}
                        onClick={() => {
                            if (confirm(`Are you sure to complete this task because you can't edit todo after Mark as completed`)) {
                                dispatch(setCompletedTodo(todo))
                            }
                        }}
                    >
                        Mark as completed
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="flex justify-center dark:bg-black">
                <div className="w-full p-8">
                    <h1 className='text-center text-2xl font-bold leading-9 tracking-tight text-blue-800'>
                        Todo List
                    </h1>


                    <AddTodo />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {todoCard}
                    </div>

                </div>
            </div>
        </>
    )
}
