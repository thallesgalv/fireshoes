const SplashScreen = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        zIndex: 999999
      }}
    >
      <h1 style={{ fontSize: 200 }}>SplashScreen</h1>
    </div>
  )
}

export default SplashScreen
