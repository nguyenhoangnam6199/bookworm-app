import React, { Component } from 'react';
import logo from "../../assets/bookcover/book8.jpg";
import Paginate from './Paginate';
export default class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '1',
            per: '5',
            condition: 'sale',
            isAsc: 'false',
            star: '1',
            book: [],
            numOfStar: [],
            sumStar: [],
            review: [],
            page: '1',
            to: ''
        }
        this.setPage = this.setPage.bind(this);
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
    }
    componentWillMount() {
        this.FetchData1();

        this.FetchData();
    }
    async FetchData1() {
        await axios.get('http://127.0.0.1:8000/api/book/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    book: res.data
                });
                console.log(this.state.book);
            })
            .catch((error) => {
                console.log(error);
            });
        await axios.get('http://127.0.0.1:8000/api/getStar/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    numOfStar: res.data
                });
                console.log(this.state.numOfStar);
            })
            .catch((error) => {
                console.log(error);
            });
        await axios.get('http://127.0.0.1:8000/api/getSumStar/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    sumStar: res.data
                });
                console.log(this.state.sumStar);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async FetchData() {
        let config = {
            params: {
                id: this.props.match.params.id,
                star: this.state.star,
                condition: this.state.condition,
                isAsc: this.state.isAsc,
                per: this.state.per,
                page: this.state.page
            }
        }
        axios.get('http://127.0.0.1:8000/api/filterReview/' + this.props.match.params.id + "/" + this.state.star + "/" +
            this.state.condition + "/" + this.state.isAsc + "/" + this.state.per + "?page=" + this.state.page)
            //   await axios.get('http://127.0.0.1:8000/api/filterReview/',config)
            .then(res => {
                this.setState({
                    review: res.data.data,
                    page: res.data.current_page,
                    to: res.data.last_page
                });
                console.log(this.state.review);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async setPage(number) {
        console.log("cur page: " + number)
        await this.setState({
            page: number
        })
        this.FetchData()
    }

    async Func1() {
        var x = document.getElementById('sortText').value;
        if (x === "time1") {
            x = "time";
            await this.setState(
                { isAsc: 'false' }
            )
        }
        else if (x === "time2") {
            x = "time";
            await this.setState(
                { isAsc: 'true' }
            )
        }
        else {
            x = "sale";
        }
        await this.setState(
            { condition: x }
        )
        this.FetchData();
    }

    async Func2() {
        var x = document.getElementById('sortNum').value;
        await this.setState(
            { per: x }
        )
        this.FetchData();
    }

    AddFunction() {
        var x = document.getElementById('number').value;
        var rs = 0;
        rs = parseInt(x) + 1;
        document.getElementById('number').value = rs;
    }

    SubFunction() {
        var x = document.getElementById('number').value;
        var rs = 0;
        rs = parseInt(x) - 1;
        if (rs < 1) {
            rs = 1;
        }
        document.getElementById('number').value = rs;
    }

    async FuncStar(id) {
        var x = document.getElementById(id).id;
        await this.setState(
            {
                star: x,
            }
        )
        this.FetchData();
    }
    render() {
        return (
            <div className="container">
                {this.state.book.map(b => (
                    <div key={b.id} className="row">
                        <div className="col-md-8 rounded" style={{ border: '1px solid', padding: '15px' }}>
                            <div className="col-5" style={{ float: 'left' }}>
                                <div className="card">
                                    <img style={{ maxHeight: '200px' }} src={"../../assets/bookcover/" + b.book_cover_photo + ".jpg"} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 style={{ fontSize: '15px' }} className="card-title">By (author): {b.author.author_name}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7" style={{ float: 'right' }}>
                                <h5>{b.book_title}</h5>
                                <p>{b.book_summary}</p>
                            </div>
                        </div>
                        <div className="col-md-3 rounded" style={{ marginLeft: '80px', border: '1px solid', padding: '15px' }}>
                            {(b.book_price !== b.final_price)
                                ? <del>${b.book_price}</del>
                                : ""
                            }
                            <span style={{ fontSize: '25px' }}>${b.final_price}</span>
                            <hr style={{ margin: 'auto' }} />
                            <br />
                            <br />
                            <h5>Quantity</h5>
                            <div>
                                <div className="input-group number-spinner" style={{ width: '80%', margin: 'auto' }}>
                                    <span className="input-group-btn">
                                        <button id="btnSub" className="btn btn-default" data-dir="dwn" onClick={() => this.SubFunction()}>-</button>
                                    </span>
                                    <input id="number" type="text" className="form-control text-center" value="1" readOnly />
                                    <span className="input-group-btn">
                                        <button id="btnAdd" className="btn btn-default" data-dir="up" onClick={() => this.AddFunction()}>+</button>
                                    </span>
                                </div>
                                <button type="button" className="btn btn-secondary" style={{ marginTop: '40px', width: '80%', marginLeft: '25px' }}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
                <br />
                <br />
                <div className="row">
                    <div className="col-md-8 rounded" style={{ border: '1px solid', padding: '15px' }}>
                        <h5>Customer Reviews (Filter by {this.state.star} star)</h5>
                        <br />

                        {this.state.book.map(b => (
                            // (b.star==="")
                            //     ? <h5> 0 </h5>
                            //     : <h5>{parseFloat(b.star)} Star</h5> 
                            <h5>{parseFloat(b.star)} Star</h5>
                        ))}

                        {/* <h5>0 Star</h5> */}
                        <p>total ({this.state.sumStar.map(b => (
                            (b.sumofstar !== "")
                                ? b.sumofstar
                                : 0
                        ))}) |
                            <span id="5" onClick={() => this.FuncStar("5")}> 5 star ({this.state.numOfStar.map(b => (
                                (b.rating_start === "5")
                                    ? (b.sl)
                                    : ""
                            ))})
                            </span>
                            |
                            <span id="4" onClick={() => this.FuncStar("4")}> 4 star ({this.state.numOfStar.map(b => (
                                (b.rating_start === "4")
                                    ? (b.sl)
                                    : ""
                            ))})
                            </span>
                            |
                            <span id="3" onClick={() => this.FuncStar("3")}>3 star ({this.state.numOfStar.map(b => (
                                (b.rating_start === "3")
                                    ? (b.sl)
                                    : ""
                            ))})
                            </span>
                            |
                            <span id="2" onClick={() => this.FuncStar("2")}>2 star ({this.state.numOfStar.map(b => (
                                (b.rating_start === "2")
                                    ? (b.sl)
                                    : ""
                            ))})
                            </span>
                            |
                            <span id="1" onClick={() => this.FuncStar("1")}>1 star ({this.state.numOfStar.map(b => (
                                (b.rating_start === "1")
                                    ? (b.sl)
                                    : ""
                            ))})
                            </span>
                        </p>
                        <div>
                            <p style={{ float: 'left' }}></p>
                            <div className='col-8' style={{ float: 'right' }}>
                                {/* <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" style={{ float: 'left' }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Sort by on sale
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Sort by date: newest to oldest</a>
                                        <a className="dropdown-item" href="#">Sort by date: newest to oldest</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                                <div className="dropdown" style={{ float: 'right', marginRight: '105px' }}>
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Dropdown button
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div> */}

                                <select id="sortText" className="custom-select" style={{ float: 'left', width: '60%' }} onClick={() => this.Func1()}>
                                    <option value="sale">Sort by on sale</option>
                                    <option value="time1">Sort by date: newest to oldest</option>
                                    <option value="time2">Sort by date: oldest to newest</option>
                                </select>
                                <select id="sortNum" className="custom-select" style={{ float: 'right', width: '25%', marginRight: '36px' }} onClick={() => this.Func2()}>
                                    <option value="5">Show 5</option>
                                    <option value="10">Show 10</option>
                                    <option value="15">Show 15</option>
                                </select>

                            </div>
                        </div>
                        <br />
                        <br />
                        <hr />
                        <br />
                        {this.state.review.map(b => (
                            <div key={b.id}>
                                <h5>{b.review_title} | {this.state.star} Star</h5>
                                <p>{b.review_details}</p>
                                <p>{b.review_date}</p>
                                <hr />
                                <br />
                            </div>
                        ))}
                        {/* <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav> */}
                        <Paginate
                            className="text-center"
                            page_count={this.state.to}
                            current_page={this.state.page}
                            setPage={this.setPage}
                        />
                    </div>
                    <div className="col-md-3 rounded" style={{ marginLeft: '80px', border: '1px solid', padding: '15px', height: '455px' }}>
                        <h5>Write a Review</h5>
                        <hr style={{ margin: 'auto' }} />
                        <br />
                        <br />
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Add a title</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add a Title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Detail please! Your review helps other shoppers</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add a content" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Select a rating star</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </form>
                        <hr />
                        <button style={{ marginLeft: '55px' }} type="button" className="btn btn-secondary">Submit Review</button>
                    </div>
                </div>
            </div>
        )
    }
}
