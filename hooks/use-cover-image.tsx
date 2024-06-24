import { create } from "zustand";

type CoverImageStore = {
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;
};

export const useCoverImage = create<CoverImageStore>((set) => ({
    isOpen: false,
    onOpen: () => {
        console.log("onOpen clicked");
        set(state => {
            console.log("State before onOpen:", state);
            return { isOpen: true };
        });
    },
    onClose: () => {
        set(state => {
            console.log("State before onClose:", state);
            return { isOpen: false };
        });
    }
}));
