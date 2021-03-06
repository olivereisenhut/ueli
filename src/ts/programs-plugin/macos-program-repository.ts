import * as path from "path";
import { FileHelpers } from "../helpers/file-helpers";
import { Program } from "./program";
import { ProgramRepository } from "./program-repository";

export class MacOsProgramRepository implements ProgramRepository {
    private folder = "/Applications";
    private applicationFileExtension = ".app";
    private programs: Program[];

    public constructor() {
        this.programs = this.loadPrograms();
    }

    public getPrograms(): Program[] {
        return this.programs;
    }

    private loadPrograms(): Program[] {
        const result = [] as Program[];

        const files = FileHelpers.getFilesFromFolderRecursively(this.folder);

        for (const file of files) {
            if (!file.endsWith(this.applicationFileExtension)) {
                continue;
            }

            result.push({
                executionArgument: file,
                name: path.basename(file).replace(this.applicationFileExtension, ""),
            } as Program);
        }

        return result;
    }
}
