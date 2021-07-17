import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div>
                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 className="title-page text-white">About Us</h2>
                    </div>
                </section>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <header className="section-heading">
                                <h2 className="section-title text-center">Welcome to Bookworm</h2>
                            </header>

                            <p>"Bookworm is an independent New York bookstore and language school with locations in
                                Manhattan and Brooklyn. We specialize in travel books and language classes."</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4>Our Story</h4>
                            <p>The name Bookworm was taken from the original name for New York International Airport,
                                which was renamed JFK in December 1963.</p>
                            <p>Our Manhattan store has just moved to the West Village. Our new location is 170 7th Avenue
                                South, at the corner of Perry Street.</p>
                            <p>From March 2008 through May 2016, the store was located in the Flatiron District.</p>
                        </div>
                        <div className="col">
                            <h4>Our Vision</h4>
                            <p>One of the last travel bookstores in the country, our Manhattan store carries a range of
                                guidebooks (all 10% off) to suit the needs and tastes of every traveller and budget.</p>
                            <p>We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook,
                                and our well-read, well-travelled staff is happy to make reading recommendations for any
                                traveller, book lover, or gift giver</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
