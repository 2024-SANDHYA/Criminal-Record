import img1 from './asset-2/image1.png' 
import img2 from './asset-2/undraw_Portfolio_update_re_jqnp.png'
import img3 from './asset-2/undraw_Map_dark_re_36sy.png'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const About = () => {
    return (

        <div>
            <div className = "about-us">
                <div className="s-heading">
	                <h2>How <span className = "block"> it </span>Works?</h2>
	                <p>Get Updates about Crimes happening around you.
                    On the Go!</p>
	            </div>
                <div className="container-fluid d-flex justify-content-center">
                    
                    <div class="row">
                        <div className="col-md-4">
                            <Card imgsrc={img1} title="Sign up" subtitle="Sign up and give access to your current location for tracking."/>
                        </div>
                        <div className="col-md-4">
                            <Card imgsrc={img2} title="Add/Update Records" subtitle="Add past or present crimes you want to report in your locality."/>
                        </div>
                        <div className="col-md-4">
                            <Card imgsrc={img3} title="Get Alerts" subtitle="Save routes and get alerts whenever you enter an area with a high crime rate."/>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>

    );
}

const Card = (props) => {
    return(
            // <div className="card">
            //     <div className="card-body">
            //         <img className = "card-image" src = {props.img} />
            //         <h2 className="card-title">{props.title}</h2>
            //         <p className ="card-description">{props.dsp}</p>
            //     </div>
            // </div>
            <>
            <div className="card text-center">
                <div className="overflow">
                    <img src={props.imgsrc} alt="Image 1" className="card-img-top"/>
                </div> 
                <div className="card-body text">
                    <h2 className="card-title">{props.title}</h2>
                    <p className="card-subtitle">{props.subtitle}</p>
                </div>
            </div>
            </>
    );
}

export default About;

/* <div className = "wrapper">
<Card img = {img1} title="Sign up" dsp="Sign up and give access to your current location for the tracking."/>
<Card img = {img2} title="Update the Records" dsp="Add past or present crimes you want to report in your locality."/>
<Card img = {img3} title="Get Statistics" dsp="Save your routes, get crime statistics for your area, and get alerts whenever you enter an area with a high crime rate."/>

</div> */