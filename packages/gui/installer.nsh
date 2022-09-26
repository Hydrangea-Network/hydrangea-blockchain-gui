!include "nsDialogs.nsh"

; Add our customizations to the finish page
!macro customFinishPage
XPStyle on

Var DetectDlg
Var FinishDlg
Var HydrangeaSquirrelInstallLocation
Var HydrangeaSquirrelInstallVersion
Var HydrangeaSquirrelUninstaller
Var CheckboxUninstall
Var UninstallHydrangeaSquirrelInstall
Var BackButton
Var NextButton

Page custom detectOldHydrangeaVersion detectOldHydrangeaVersionPageLeave
Page custom finish finishLeave

; Add a page offering to uninstall an older build installed into the hydrangea-blockchain dir
Function detectOldHydrangeaVersion
  ; Check the registry for old hydrangea-blockchain installer keys
  ReadRegStr $HydrangeaSquirrelInstallLocation HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\hydrangea-blockchain" "InstallLocation"
  ReadRegStr $HydrangeaSquirrelInstallVersion HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\hydrangea-blockchain" "DisplayVersion"
  ReadRegStr $HydrangeaSquirrelUninstaller HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\hydrangea-blockchain" "QuietUninstallString"

  StrCpy $UninstallHydrangeaSquirrelInstall ${BST_UNCHECKED} ; Initialize to unchecked so that a silent install skips uninstalling

  ; If registry keys aren't found, skip (Abort) this page and move forward
  ${If} HydrangeaSquirrelInstallVersion == error
  ${OrIf} HydrangeaSquirrelInstallLocation == error
  ${OrIf} $HydrangeaSquirrelUninstaller == error
  ${OrIf} $HydrangeaSquirrelInstallVersion == ""
  ${OrIf} $HydrangeaSquirrelInstallLocation == ""
  ${OrIf} $HydrangeaSquirrelUninstaller == ""
  ${OrIf} ${Silent}
    Abort
  ${EndIf}

  ; Check the uninstall checkbox by default
  StrCpy $UninstallHydrangeaSquirrelInstall ${BST_CHECKED}

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $DetectDlg

  ${If} $DetectDlg == error
    Abort
  ${EndIf}

  !insertmacro MUI_HEADER_TEXT "Uninstall Old Version" "Would you like to uninstall the old version of Hydrangea Blockchain?"

  ${NSD_CreateLabel} 0 35 100% 12u "Found Hydrangea Blockchain $HydrangeaSquirrelInstallVersion installed in an old location:"
  ${NSD_CreateLabel} 12 57 100% 12u "$HydrangeaSquirrelInstallLocation"

  ${NSD_CreateCheckBox} 12 81 100% 12u "Uninstall Hydrangea Blockchain $HydrangeaSquirrelInstallVersion"
  Pop $CheckboxUninstall
  ${NSD_SetState} $CheckboxUninstall $UninstallHydrangeaSquirrelInstall
  ${NSD_OnClick} $CheckboxUninstall SetUninstall

  nsDialogs::Show

FunctionEnd

Function SetUninstall
  ; Set UninstallHydrangeaSquirrelInstall accordingly
  ${NSD_GetState} $CheckboxUninstall $UninstallHydrangeaSquirrelInstall
FunctionEnd

Function detectOldHydrangeaVersionPageLeave
  ${If} $UninstallHydrangeaSquirrelInstall == 1
    ; This could be improved... Experiments with adding an indeterminate progress bar (PBM_SETMARQUEE)
    ; were unsatisfactory.
    ExecWait $HydrangeaSquirrelUninstaller ; Blocks until complete (doesn't take long though)
  ${EndIf}
FunctionEnd

Function finish

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $FinishDlg

  ${If} $FinishDlg == error
    Abort
  ${EndIf}

  GetDlgItem $NextButton $HWNDPARENT 1 ; 1 = Next button
  GetDlgItem $BackButton $HWNDPARENT 3 ; 3 = Back button

  ${NSD_CreateLabel} 0 35 100% 12u "Hydrangea has been installed successfully!"
  EnableWindow $BackButton 0 ; Disable the Back button
  SendMessage $NextButton ${WM_SETTEXT} 0 "STR:Let's Farm!" ; Button title is "Close" by default. Update it here.

  nsDialogs::Show

FunctionEnd

; Copied from electron-builder NSIS templates
Function StartApp
  ${if} ${isUpdated}
    StrCpy $1 "--updated"
  ${else}
    StrCpy $1 ""
  ${endif}
  ${StdUtils.ExecShellAsUser} $0 "$launchLink" "open" "$1"
FunctionEnd

Function finishLeave
  ; Launch the app at exit
  Call StartApp
FunctionEnd

; Section
; SectionEnd
!macroend
