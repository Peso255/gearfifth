import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Course, {CourseData} from './components/Course'

function App() {
    const [courses, setCourses] = useState<CourseData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/courses`)
            .then(courses => {
                setCourses(courses.data);
                setLoading(false);
            })
            .catch(e => console.error(e))
    }, []);
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">
          Courses
      </h1>
        <p className="mb-5">
            Browse our available courses and see how many students are enrolled.
        </p>
        <div className="flex justify-center">
            {loading ?
                (<strong>Loading...</strong>) :
                (<table className="table-auto text-left w-11/12 md:w-1/2">
                    <thead>
                    <tr>
                        <th className="text-sm table-content">Course</th>
                        <th className="text-sm text-right table-content">Enrolments</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        courses.map(course => {return (
                            <Course _id={course._id} title={course.title} description={course.description} imageUrl={course.imageUrl} onViewDetails={(users) => {
                                course.users = users;
                                setSelectedCourse(course)
                            }} />
                        )})
                    }
                    </tbody>
                </table>)}
        </div>
        {selectedCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-gray-700 p-6 rounded shadow-lg w-11/12 max-w-md text-white">
                    {selectedCourse.imageUrl ? (<img className="mb-4" src={selectedCourse.imageUrl}/>) : ""}
                    <p className="mb-2 font-semibold">{selectedCourse.title}</p>
                    <p className="mb-2">{selectedCourse.description}</p>
                    <p className="font-semibold">Enrolled Users:</p>
                    <ul className="mb-4">
                        {selectedCourse.users.map(user => (
                            <li>{user.name}</li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setSelectedCourse(null)}
                        className="px-4 py-2 text-white rounded bg-black"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
    </>
  )
}

export default App
