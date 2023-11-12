function Name(props){
    return (
        <div>
            <h4>Student ID: {props.id}</h4>
            <h5>Student Name: {props.fnm} {props.lnm}</h5>
        </div>
    );
}

export default Name