import axios from "axios";
import { useState } from "react";
import StarIconEmpty from "../assets/icons/StarIconEmpty.jsx";
import DeleteIcon from "../assets/icons/deleteIcon.jsx";
import IconUpload from "../assets/icons/imageUploadIcon.jsx";
import StarIconFilled from "../assets/icons/starIconFilled.jsx";

export default function PhotoUploader({ addedPhoto, onChange }) {
    const [photoLink, setPhotoLink] = useState("");

    async function addPhotoByLink(e) {
        e.preventDefault();

        const { data: filename } = await axios.post("/api/uploadByLink", {
            link: photoLink,
        });
        // console.log(photoLink, " from photo link");

        // this function used for validate if the link is image's link
        function isImgUrl(url) {
            return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
        }
        // console.log(isImgUrl(photoLink)); // to see resaults

        if (photoLink === "" || isImgUrl(photoLink) === false) {
            // if input is empty or improper image's link
            alert("You selected add photo without inputing a proper link");
        } else {
            onChange((prev) => {
                return [...prev, filename];
            });
        }
        setPhotoLink("");
    }

    function uploadPhoto(e) {
        const files = e.target.files;
        console.log({ files }); // <-- to check file
        for (let i = 0; i < files.length; i++) {
            console.log(files[i].type.split("/")[0]);
            if (files[i].type.split("/")[0] !== "image") {
                alert("File not compatible");
            } else {
                const data = new FormData();

                data.append("photos", files[i]);

                axios
                    .post("/api/upload", data, {
                        headers: { "Content-type": "multipart/form-data" },
                    })
                    .then((response) => {
                        // console.log(response);
                        const { data: filenames } = response;
                        onChange((prev) => {
                            return [...prev, ...filenames];
                        });
                    });
            }
        }
    }

    function removePhoto(e, filename) {
        e.preventDefault();
        onChange([...addedPhoto.filter((eachPhoto) => eachPhoto !== filename)]);
    }

    function setMainPhoto(e, filename) {
        e.preventDefault();

        onChange([
            filename,
            ...addedPhoto.filter((eachPhoto) => eachPhoto !== filename),
        ]);
    }

    const btnEffect = "hover:scale-110 duration-200";

    return (
        <>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={photoLink}
                    onChange={(e) => setPhotoLink(e.target.value)}
                    placeholder={"URL LINK : to trail image"}
                />
                <button
                    onClick={addPhotoByLink}
                    className="bg-white text-slate-600 border p-4 flex rounded-2xl gap-2 items-center cursor-pointer hover:bg-secondary/10 duration-200">
                    add&nbsp;photo
                </button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {addedPhoto.length > 0 &&
                    addedPhoto.map((link) => (
                        <div key={link} className="h-32 flex relative">
                            <img
                                className="rounded-2xl w-full object-cover"
                                src={`http://localhost:8000/uploads/${link}`}
                                alt=""
                            />
                            <button
                                onClick={(e) => removePhoto(e, link)}
                                className="cursor-pointer absolute bottom-2 right-2 text-slate-300 text-lg font-bold bg-slate-300 bg-opacity-20 rounded">
                                <DeleteIcon
                                    className={`text-slate-200/50 hover:text-slate-200 ${btnEffect}`}
                                />
                            </button>
                            <button
                                onClick={(e) => setMainPhoto(e, link)}
                                className="cursor-pointer absolute top-2 right-2 text-slate-300 text-lg font-bold bg-slate-300 bg-opacity-20 rounded">
                                {link === addedPhoto[0] ? (
                                    <StarIconFilled
                                        className={`text-slate-200/50 hover:text-slate-200 ${btnEffect}`}
                                    />
                                ) : (
                                    <StarIconEmpty
                                        className={`text-slate-200/50 hover:text-slate-200 ${btnEffect}`}
                                    />
                                )}
                            </button>
                        </div>
                    ))}

                {/* --UPLOAD-- */}

                <label className="h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-2 text-slate-400 text-xl gap-1 hover:bg-secondary/10 duration-200">
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={uploadPhoto}
                    />
                    <IconUpload className={`w-8 h-8 ${btnEffect}`} /> Upload
                </label>
            </div>
        </>
    );
}
