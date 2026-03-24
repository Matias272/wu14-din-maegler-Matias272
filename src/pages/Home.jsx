import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";
import Hero from "../assets/hero.jpg"
import Family from "../assets/family.jpg"
import "./Home.scss"
export default function Home (){
    return (
        <>
        <Header />
        <section className="home_hero">
                <img className="home_hero_img" src={Hero} alt="" />
            <div className="home_hero_content">
                <h2>Søg efter din drømmebolig</h2>
                <Search />
            </div>
        </section>
        <section className="home_intro">
            <div className="section_wrapper">
                <div>
                    <div className="home_intro_img">
                        <img src={Family} alt="" />
                        <div className="home_intro_img_over">
                            <div className="home_intro_img_over_content">
                                <h2>38+</h2>
                                <p>års mægler- erfaring</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </section>
        <Footer />
        </>
    )
}