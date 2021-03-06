import * as childProcess from "child_process";
import { ipcMain } from "electron";
import { Config } from "./config";
import { CommandLineExecutionArgumentValidator } from "./execution-argument-validators/command-line-execution-argument-validator";
import { UeliCommandExecutionArgumentValidator } from "./execution-argument-validators/ueli-command-execution-argument-validator";
import { ExecutionArgumentValidator } from "./execution-argument-validators/execution-argument-validator";
import { FilePathExecutionArgumentValidator } from "./execution-argument-validators/file-path-execution-argument-validator";
import { WebSearchExecutionArgumentValidator } from "./execution-argument-validators/web-search-execution-argument-validator";
import { WebUrlExecutionArgumentValidator } from "./execution-argument-validators/web-url-execution-argument-validator";
import { WindowsSettingsExecutionArgumentValidator } from "./execution-argument-validators/windows-settings-execution-argument-validator";
import { CommandLineExecutor } from "./executors/command-line-executor";
import { UeliCommandExecutor } from "./executors/ueli-command-executor";
import { Executor } from "./executors/executor";
import { FilePathExecutor } from "./executors/file-path-executor";
import { WebSearchExecutor } from "./executors/web-search-executor";
import { WebUrlExecutor } from "./executors/web-url-executor";
import { WindowsSettingsExecutor } from "./executors/windows-settings-executor";
import { Injector } from "./injector";
import { OperatingSystem } from "./operating-system";
import { ExecutionArgumentValidatorExecutorCombination } from "./execution-argument-validator-executor-combination";
import { IpcChannels } from "./ipc-channels";
import { EmailAddressInputValidator } from "./input-validators/email-address-input-validator";
import { EmailAddressExecutionArgumentValidator } from "./execution-argument-validators/email-address-execution-argument-validator";
import { platform } from "os";

const currentOperatingSystem = platform() === "win32"
    ? OperatingSystem.Windows
    : OperatingSystem.macOS;

export class ExecutionService {
    private validatorExecutorCombinations = [
        {
            executor: new CommandLineExecutor(),
            validator: new CommandLineExecutionArgumentValidator(),
        },
        {
            executor: new UeliCommandExecutor(),
            validator: new UeliCommandExecutionArgumentValidator(),
        },
        {
            executor: new FilePathExecutor(),
            validator: new FilePathExecutionArgumentValidator(),
        },
        {
            executor: new WebSearchExecutor(),
            validator: new WebSearchExecutionArgumentValidator(),
        },
        {
            executor: new FilePathExecutor(),
            validator: new EmailAddressExecutionArgumentValidator(),
        },
        {
            executor: new WebUrlExecutor(),
            validator: new WebUrlExecutionArgumentValidator(),
        },
    ] as ExecutionArgumentValidatorExecutorCombination[];

    constructor() {
        if (currentOperatingSystem === OperatingSystem.Windows) {
            this.validatorExecutorCombinations.push(
                {
                    executor: new WindowsSettingsExecutor(),
                    validator: new WindowsSettingsExecutionArgumentValidator(),
                } as ExecutionArgumentValidatorExecutorCombination,
            );
        }
    }

    public execute(executionArgument: string): void {
        for (const combi of this.validatorExecutorCombinations) {
            if (combi.validator.isValidForExecution(executionArgument)) {
                if (combi.executor.resetUserInputAfterExecution()) {
                    ipcMain.emit(IpcChannels.resetUserInput);
                }

                setTimeout(() => {
                    if (combi.executor.hideAfterExecution()) {
                        ipcMain.emit(IpcChannels.hideWindow);
                    }

                    combi.executor.execute(executionArgument);
                }, 50); // set delay for execution to 50ms otherwise user input reset does not work properly

                return;
            }
        }
    }
}
