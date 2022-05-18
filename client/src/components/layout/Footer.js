import classes from './style/Footer.module.css';
// import 'bootstrap/dist/css/bootstrap.css';

function FooterPage() {
    return (
        <div className={`footer dark ${classes.footer}`}>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3 className={classes.titles}>Support</h3>
                            <ul>
                                <li><a href="#">How do I pay?</a></li>
                                <li><a href="#">What if an event gets cancelled?</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3 className={classes.titles}>About</h3>
                            <ul>
                                <li><a href="#">Company</a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3 className={classes.titles}>Partier</h3>
                            <p>Partier is an online platform for concerts, festivals, parties and much more. </p>
                        </div>
                        <div className="col item social">
                            <a href="#"><i className="icon ion-social-facebook"/></a>
                            <a href="#"><i className="icon ion-social-twitter"/></a>
                            <a href="#"><i className="icon ion-social-snapchat"/></a>
                            <a href="#"><i className="icon ion-social-instagram"/></a>
                        </div>
                    </div>
                    <p className={`copyright ${classes.copyright}`}>Partier © {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    )
}

export default FooterPage;