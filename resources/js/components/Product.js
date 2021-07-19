import React, { Component } from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import logo from "../../../public/assets/bookcover/book8.jpg"

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book: []
            // author: {
            //     id: 1,
            //     author_name: "Megane Kris DVM",
            //     author_bio: "Eligendi necessitatibus ut dolorem. Dolor aut assumenda in rem. Voluptatum sit eos rerum modi amet sit."
            // },
            // id: 1,
            // category_id: 1,
            // author_id: 1,
            // book_title: "Officia omnis enim",
            // book_summary: "Alice, with a soldier on each side to guard him; and near the centre of the soldiers remaining behind to execute the unfortunate gardeners, who ran to Alice for protection. 'You shan't be beheaded!'.",
            // book_price: "30.78",
            // book_cover_photo: "book4",
            // final_price: "30.78",
            // category: {
            //     id: 1,
            //     category_name: "runolfsson",
            //     category_desc: "Quasi qui a fuga. Quod mollitia nisi at ipsam ducimus ratione. Voluptatem delectus et asperiores iure."
            // }
        };
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
    }

    componentWillMount() {
        axios.get('http://127.0.0.1:8000/api/book/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    book: res.data
                });
                console.log(this.state.book);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    addFunction(){
        var x = document.getElementById('number').value;
        var rs = 0;
        rs = parseInt(x) +1;
        document.getElementById('number').value=rs;
    }

    minusFunction(){
        var x = document.getElementById('number').value;
        var rs = 0;
        rs = parseInt(x) -1;
        if(rs<0){
            rs=0;
        }
        document.getElementById('number').value=rs;
    }
    render() {
        return (
            <div>
                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 className="title-page text-white">Product Detail</h2>
                    </div>
                </section>
                <br />
                {this.state.book.map(b => (
                    <div className="container" key={b.id}>

                        <div className="row">
                            <div className="col-md-8 border border-dark">
                                <div className="media">
                                    <img className="align-self-start mr-3" src={'../../assets/bookcover/'+b.book_cover_photo+'.jpg'} alt="logo" style={{ width: '20%', marginTop: '10px' }} />
                                    <div className="media-body">
                                        <br/>
                                        <h5 className="mt-0">{b.book_title}</h5>
                                        <h7 className="mt-0">{b.author.author_name}</h7>
                                        <p>{b.book_summary}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card" style={{ width: '18rem' }}>
                                    <div className="card-header">
                                        <del className="price-old">${b.book_price}</del>
                                        <span><b style={{ fontSize: '30px' }}>${b.final_price}</b></span>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <br />
                                        Quantity
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-outline-secondary" type="button" 
                                                onClick={()=>this.minusFunction()}>
                                                    -
                                                </button>
                                            </div>
                                            <input type="text" id="number" className="form-control" value="1" style={{ textAlign: 'center' }} readOnly />
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary" type="button" onClick={()=>this.addFunction()}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <br />
                                        <button type="button" className="btn btn-success">Add To Cart</button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action active" style={{ textAlign: 'center' }}>
                                        Write a Review
                                    </a>
                                    <br/>
                                    <form>
                                        <div className="form-group">
                                            <label>Add Title</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter title" />
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Details please! Your review helps other shoppers</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter details" />
                                        </div>
                                        <div className="form-group">
                                            <label className="my-1 mr-2">Select a rating star</label>
                                            <select className="custom-select my-1 mr-sm-2" defaultValue="1">
                                                <option value="1" disabled>Choose...</option>
                                                <option value="1">1 Star</option>
                                                <option value="2">2 Star</option>
                                                <option value="3">3 Star</option>
                                                <option value="4">4 Star</option>
                                                <option value="5">5 Star</option>
                                            </select>
                                        </div>

                                        <button type="submit" className="btn btn-success" style={{ marginLeft: '480px' }}>Submit Review</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        )
    }
}
