import React from 'react';

import findHouseIMG from '../HackYourEstate/assets/seach-house-icon.png';
import UploadHouseIMG from '../HackYourEstate/assets/upload-data-icon.svg';
import contributeIMG from '../HackYourEstate/assets/contribute.png';
import easytoUse from '../HackYourEstate/assets/easy-to-use.png';
import catalog from '../HackYourEstate/assets/catalog.png';
import openSource from '../HackYourEstate/assets/open-source.png';
import mysqlIcon from '../HackYourEstate/assets/mysql-icon.svg';
import nodeJSIcon from '../HackYourEstate/assets/nodejs-icon.png';
import reactIcon from '../HackYourEstate/assets/reactjs-icon.png';

const Home = () => {
    return (
        <div>
            <div className="header ">
                <h1> Hack your State</h1>
                <h2>
                    A REST API for finding, uploading <br />
                    and selling houses
                </h2>
            </div>
            <section className="featuresAll ">
                <h2>Features</h2>
                <div className="features">
                    <div>
                        <img
                            className="icons"
                            src={findHouseIMG}
                            alt="search"
                        />
                        <p>Search for houses</p>
                    </div>
                    <div>
                        <img
                            className="icons"
                            src={UploadHouseIMG}
                            alt="search"
                        />
                        <br />
                        <p>Upload house data</p>
                    </div>
                    <div>
                        <img
                            className="icons"
                            src={contributeIMG}
                            alt="search"
                        />
                        <br />
                        <p>Contribute to API</p>
                    </div>
                </div>
            </section>

            <section className="benefitsAll">
                <h2>Benefits </h2>

                <div className="benefitsMain">
                    <div className="iconDesc">
                        <img src={easytoUse} alt="easy to use" />{' '}
                        <p>
                            <span>Easy to use</span> <br />
                            Find or upload in a matter of clicks
                        </p>
                    </div>
                    <div className="iconDesc">
                        <img src={openSource} alt="open source" />
                        <p>
                            <span>Open-source</span> <br />
                            Feel like the API is incomplete?
                            <br />
                            Feel free to contribute!
                        </p>
                    </div>
                    <div className="iconDesc">
                        <img src={catalog} alt="catalog" />
                        <p>
                            <span>Extensive catalog</span> <br />
                            Find your dream house in no time
                        </p>
                    </div>
                </div>
            </section>

            <section className="featuresAll">
                <h2>Written in </h2>
                <div className="features">
                    <div>
                        <img className="icons" src={mysqlIcon} alt="mysql" />
                    </div>
                    <div>
                        <img className="icons" src={nodeJSIcon} alt="nodeJS " />
                    </div>
                    <div>
                        <img className="icons" src={reactIcon} alt="react" />
                        <br />
                    </div>
                </div>
            </section>

            <section className="benefitsAll">
                <h2>What are you waiting for? </h2>

                <div className="benefitsMain">
                    <div className="iconDesc">
                        <p>
                            Find your
                            <span class="TextUnderline">next house</span>, or go
                            <span class="TextUnderline">contribute!</span>
                        </p>
                    </div>
                </div>
            </section>
            <div className="footer">
                <h3> © Copyright by HackYourFuture 2019</h3>
            </div>
        </div>
    );
};

export default Home;
