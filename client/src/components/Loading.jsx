import loadingImg  from "../assets/Loading.png"


const Loading = () => {
    return <div className="flex items-center justify-center h-screen">
        <img src={loadingImg} alt="loading" className="animate-spin w-[4rem]"></img>
    </div>
}

export default Loading ;