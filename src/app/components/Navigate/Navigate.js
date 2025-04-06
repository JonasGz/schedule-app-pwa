'use client'
import { LayoutDashboard } from 'lucide-react';
import './Navigate.scss';
import { useRouter } from 'next/navigation';
import { ListTodo } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navigate = () => {
  const router = useRouter();
  const pathname = usePathname();

  return(
    <div className="navigate">
      <ul className="navigate__ul">
        <li onClick={() => router.push('/dashboard')} className={`navigate__li ${pathname.includes('/dashboard') ? 'active' : ''}`} ><LayoutDashboard size={20} />Dashboard</li>
        <li onClick={() => router.push('/tasks')} className={`navigate__li ${pathname.includes('/tasks') ? 'active' : ''}`}><ListTodo size={20} />Tasks</li>
      </ul>
    </div>
  )
}

export default Navigate;