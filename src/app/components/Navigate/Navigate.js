'use client'
import { LayoutDashboard } from 'lucide-react';
import './Navigate.scss';
import { useRouter } from 'next/navigation';
import { ListTodo } from 'lucide-react';

const Navigate = () => {
  const router = useRouter();

  return(
    <div className="navigate">
      <ul className="navigate__ul">
        <li onClick={() => router.push('/dashboard')} className="navigate__li"><LayoutDashboard size={20} />Dashboard</li>
        <li onClick={() => router.push('/tasks')} className="navigate__li"><ListTodo size={20} />Tasks</li>
      </ul>
    </div>
  )
}

export default Navigate;