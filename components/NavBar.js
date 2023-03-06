import Link from 'next/link';



export default function NavBar() {
    function NavItem(props) {
        return (
            <div className='navitem'>
                <Link href={props.location}>
                    <button>{props.name}</button>
                </Link>
            </div>
        )
    }

    return (
        <nav className='navbar'>
            <NavItem location='#' name='Round the Chowder-Kettle' />
            <NavItem location='#' name='Yawp' />
            <NavItem location='#' name='Trippers & Askers' />
            <NavItem location='#' name='Box' />
            <NavItem location='#' name='Me Myself' />
        </nav>
    )
}