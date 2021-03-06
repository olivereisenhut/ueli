import { MacOsIconManager } from "../../../ts/icon-manager/mac-os-icon-manager";

describe(MacOsIconManager.name, () => {
    const iconManager = new MacOsIconManager();

    describe(iconManager.getEmailIcon.name, () => {
        it("should return a valid svg icon", () => {
            const actual = iconManager.getEmailIcon();
            expect(actual).not.toBe(undefined);
            expect(actual).not.toBe(null);
        });
    });

    describe(iconManager.getFileIcon.name, () => {
        it("should return a valid svg icon", () => {
            const actual = iconManager.getFileIcon();
            expect(actual).not.toBe(undefined);
            expect(actual).not.toBe(null);
        });
    });

    describe(iconManager.getFolderIcon.name, () => {
        it("should return a valid svg icon", () => {
            const actual = iconManager.getFolderIcon();
            expect(actual).not.toBe(undefined);
            expect(actual).not.toBe(null);
        });
    });

    describe(iconManager.getProgramIcon.name, () => {
        it("should return a valid svg icon", () => {
            const actual = iconManager.getProgramIcon();
            expect(actual).not.toBe(undefined);
            expect(actual).not.toBe(null);
        });
    });

    describe(iconManager.getSearchIcon.name, () => {
        it("should return a valid svg icon", () => {
            const actual = iconManager.getSearchIcon();
            expect(actual).not.toBe(undefined);
            expect(actual).not.toBe(null);
        });
    });
});
