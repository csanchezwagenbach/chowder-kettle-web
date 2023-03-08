export default function ClamDigger( user ) {
    return (
        <div>
            <div>
                <h5>{user.name}</h5>
            </div>
            <div>
                <p>{user.status} in {user.home_location}</p>
            </div>
        </div>
    );
}