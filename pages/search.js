import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

function Search({ searchResults }) {

    const router = useRouter();

    const { location, startDate, endDate, noOfGuests } = router.query;

    console.log(router.query);

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;


  return (
    <div className="h-screen">
        <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>

        <main className="flex">
            <section className="flex-grow pt-14 px-6">
                <p className="text-xs">300+ Stays - {range} - for {noOfGuests} guests</p>
                <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                    <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-100 ease-out">Cancellation Flexibility</p>
                    <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-100 ease-out">Type of Place</p>
                    <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-100 ease-out">Price</p>
                    <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-100 ease-out">Rooms and Beds</p>
                    <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-100 ease-out">More filters</p>
                </div>

                <div className="flex flex-col">
                    {searchResults.map(item => (
                        <InfoCard
                            key={item.img}
                            img ={item.img}
                            location={item.location}
                            title={item.title}
                            description={item.description}
                            star={item.star}
                            price={item.price}
                            total={item.total}
                        />
                    ))}
                </div>
            </section>
        </main>

        <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz")
    .then((res) => res.json());

    return {
        props: {
            searchResults,
        },
    };
}