// Course.tsx
import { useState, useEffect } from 'react';
import axios from "axios";

type UserData = {
    _id: string;
    name: string;
    email: string;
    enrolledCourses: string[]; // course IDs
}

type CourseData = {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    users: UserData[];
};

type CourseProps = {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    onViewDetails: (users: UserData[]) => void;
};

const Course = ({ _id, title, description, onViewDetails }: CourseProps) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/users/${_id}`)
            .then(users => {
                setUsers(users.data);
                setLoading(false);
            })
            .catch(e => console.error(e))
    }, []);
    return (
        <tr className="hover:bg-gray-700/40">
            <td className="table-content"><p className="font-semibold">{title}</p><p className="text-gray-500 text-xs">{description}</p></td>
            <td className="table-content float-right align-middle"><button
                onClick={() => {if (!loading) {onViewDetails(users);}}}
                className="px-4 py-2 rounded my-auto bg-blue-500"
            >
                {loading ? "..." : users.length}
            </button></td>
        </tr>
    );
};

export default Course;
export type {UserData, CourseData};
