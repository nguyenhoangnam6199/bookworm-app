import React, { Component, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Paginate from './Paginate';
import logo from "../../../public/images/404.jpg";


export default class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from: 1,
            to: '',
            category: [],
            author: [],
            listpro: [],
            listpro1: [],
            listpro2: [],
            lo: '1',
            view: 'cate',
            auth: 'Megane Kris DVM',
            mode: 'sale',
            sort: '1',
            per: '5',
            page: '1',
            isAsc: 'false',
            star: [
                {
                    id: 1,
                    des: '1 Star'
                },
                { id: 2, des: '2 Star' },
                { id: 3, des: '3 Star' },
                { id: 4, des: '4 Star' },
                { id: 5, des: '5 Star' }
            ]
        };
        // this.FuntionBy = this.FuntionBy.bind(this);
        this.setPage = this.setPage.bind(this);
    }


    componentWillMount() {
        axios.get('http://127.0.0.1:8000/api/category')
            .then(res => {
                this.setState({
                    category: res.data
                });
                //console.log(this.state.category);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://127.0.0.1:8000/api/author')
            .then(res => {
                this.setState({
                    author: res.data
                });
                // console.log(this.state.author);
            })
            .catch((error) => {
                console.log(error);
            });
        this.FetcData()


    }

    FetcData() {
        let config = {
            params: {
                // $loai, $condition, $category, $per, $isAscending
                loai: this.state.lo,
                condition: this.state.mode,
                category: this.state.sort,
                per: this.state.per,
                page: this.state.page,
                isAscending: this.state.isAsc
            }
        }

        axios.get('http://127.0.0.1:8000/api/filterby/', config)
            .then(res => {
                this.setState({
                    listpro: res.data.data,
                    listpro2: res.data.links,
                    page: res.data.current_page,
                    to: res.data.last_page
                });
                console.log(this.state.listpro);
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
        this.FetcData()
    }


    async FuntionCate(cate) {
        var x = document.getElementById(cate).id;
        console.log(x);
        await this.setState(
            { sort: x }

        )
        console.log(this.state.sort);

        this.FetcData()
    }

    async FunctionAuth(authu) {
        var x = document.getElementById(authu).id;
        //console.log(x);
        await this.setState(
            {
                lo: '2',
                sort: x,
            }
        )
        this.FetcData();
    }

    async FuncStar(star) {
        var x = document.getElementById(star).id;
        await this.setState(
            {
                lo: '3',
                sort: x,
            }
        )
        this.FetcData();
    }

    async LoadApi(url) {
        await axios.get(url)
            .then(res => {
                this.setState({
                    listpro: res.data.data,
                });
                //console.log(this.state.from);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async FunctionBy() {
        var x = document.getElementById('sortch').value;
        if (x === "price1") {
            x = "price";
            await this.setState(
                { isAsc: 'true' }
            )
        }
        else if (x === "price2") {
            x = "price";
            await this.setState(
                { isAsc: 'false' }
            )
        }
        console.log(x);
        await this.setState({
            mode: x,
        })
        // console.log(this.state.mode);
        // console.log(this.state.isAsc);
        this.FetcData()
    }

    async FunctionBy1() {
        var x = document.getElementById('numch').value.toString();
        await this.setState({
            per: x.toString()
        })
        //console.log(x);
        //console.log(this.state.per);
        this.FetcData()
    }

    render() {
        const to1 = this.state.to;
        const from1 = this.state.from;
        return (
            <div>
                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 style={{display: 'flex'}} className="title-page text-white">
                            Books   
                            <h5 style={{marginTop:'10px', marginLeft:'5px'}}> ( Filter by {this.state.mode} )</h5>
                        </h2>
                    </div>
                </section>
                
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <b>Filter By</b>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            Category
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        {this.state.category.map(cate => (
                                            <div className="accordion-body" key={cate.id} value={cate.id} id={cate.id} onClick={() => this.FuntionCate(cate.id)}>
                                                {cate.category_name.toUpperCase()}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Author
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">

                                        {this.state.author.map(auth => (
                                            <div key={auth.id} className="accordion-body" value={auth.id} id={auth.id} onClick={() => this.FunctionAuth(auth.id)}>
                                                {auth.author_name.toUpperCase()}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Rating View
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">

                                        {this.state.star.map(st => (
                                            <div key={st.id} className="accordion-body" value={st.id} id={st.id} onClick={() => this.FuncStar(st.id)}>
                                                {st.des.toUpperCase()}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <p>      </p>
                                <div className="col-md-3" style={{ marginLeft: '550px' }}>
                                    <select id="sortch" className="custom-select" onChange={() => this.FunctionBy()}>
                                        <option value="sale">Sort By OnSale</option>
                                        <option value="popular">Sort By Popularity</option>
                                        <option value="price1">Sort By Price: low to high</option>
                                        <option value="price2">Sort By Price: hight to low</option>
                                    </select>
                                </div>
                                <div className="col-md-2" >
                                    <select id="numch" className="custom-select" onChange={() => this.FunctionBy1()}>
                                        <option value="5">Show 5</option>
                                        <option value="10">Show 10</option>
                                        <option value="15">Show 15</option>
                                        <option value="25">Show 25</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            {/* Contents */}
                            <div className="row">
                                {this.state.listpro.map(book => (
                                    <div className="col-3">
                                        <Link key={book.id} to={"/book/" + book.id}>
                                            <div className="card" style={{ minHeight: '200px', marginRight: '10px' }} >
                                                {
                                                    (book.book_cover_photo==null)
                                                        ? <img style={{ minHeight: '200px' }} className="card-img-top" src={logo} alt={book.book_title + " photo"} />
                                                        : <img style={{ maxHeight: '200px' }} className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.book_title + " photo"} />
                                                }
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ wordWrap: 'break-word', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {book.book_title}
                                                    </h5>
                                                    <p className="card-text" style={{minHeight: '70px'}}>{book.author_name}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        {(book.book_price !== book.final_price)
                                                            ? <del>${book.book_price}</del>
                                                            : ""
                                                        }
                                                        ${book.final_price}
                                                    </li>
                                                </ul>
                                            </div>
                                            <br />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <br />
                            <Paginate
                                className="text-center"
                                page_count={to1}
                                current_page={this.state.page}
                                setPage={this.setPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
