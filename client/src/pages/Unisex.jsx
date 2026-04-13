import ClientProducts from "../components/ClientProducts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Unisex() {

    return (
        <div className="app">
            <Navbar />
            <section className="content store-page">
                <h1>Unisex Fragrances</h1>

                <ClientProducts category="unisex" />
            </section>
            <Footer />
        </div>
    );
}