import { Task } from "@prisma/client";
import useStore from "../store";
import { useMutateTask } from "../hooks/useMutateTask";
import { List } from "@mantine/core";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

type Props = Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>;
export default function TaskItem({id, title, description}: Props) 
{
    const update = useStore(state => state.updateEditedTask)
    const { deleteTaskMutation } = useMutateTask();
    return (
    <List.Item>
        <div className="float-left mr-10">
            <PencilAltIcon
                className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                onClick={()=>{
                    update({
                        id, title,description
                    })
                }}
            />
            <TrashIcon
                className="h-5 w-5 cursor-pointer text-blue-500"
                onClick={()=>{
                    deleteTaskMutation.mutate(id)
                }}
            />
        </div>
        <span>{title}</span>
    </List.Item>
    );
}