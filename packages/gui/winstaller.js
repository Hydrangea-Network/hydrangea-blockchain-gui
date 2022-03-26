const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('Creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    name: "hydrangea-blockchain",
    appDirectory: path.join(rootPath, 'Hydrangea-win32-x64'),
    authors: 'Hydrangea Network',
    version: process.env.CHIA_INSTALLER_VERSION,
    noMsi: true,
    iconUrl: 'https://raw.githubusercontent.com/Hydrangea-Network/hydrangea-blockchain-gui/main/packages/gui/src/assets/img/chia.ico',
    outputDirectory: path.join(outPath, 'windows-installer'),
    certificateFile: 'win_code_sign_cert.p12',
    certificatePassword: process.env.WIN_CODE_SIGN_PASS,
    exe: 'Hydrangea.exe',
    setupExe: 'HydrangeaSetup-' + process.env.CHIA_INSTALLER_VERSION + '.exe',
    setupIcon: path.join(rootPath, 'src', 'assets', 'img', 'chia.ico')
  })
}
