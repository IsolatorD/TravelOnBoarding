import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  TouchableOpacity
} from 'react-native'

// Constants
import { images, theme } from '../../constants'
const { onboarding1, onboarding2, onboarding3 } = images

// Theme
const { COLORS, SIZES, FONTS } = theme

// Dummy data
const onBoardings = [
  {
    title: 'Let´s Travelling',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, totam?',
    img: onboarding1
  },
  {
    title: 'Navigation',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, totam?',
    img: onboarding2
  },
  {
    title: 'Destination',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, totam?',
    img: onboarding3
  }
]

const OnBoarding = () => {

  const [completed, setCompleted] = useState(false)

  const scrollX = new Animated.Value(0)

  useEffect(() => {
    // To check if user has finished scrolling onboarding pages
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 2) {
        setCompleted(true)
      }
    })

    return () => scrollX.removeListener()
  }, [])

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: {
            contentOffset: {
              x: scrollX
            }
          }}
        ], { useNativeDriver: false })}
      >
        {onBoardings.map((({ title, description, img }, i) => (
          <View
            key={i}
            style={{ width: SIZES.width }}
          >
            {/* Image */}
            <View
              style={styles.imageContainer}
            >
              <Image
                source={img}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </View>
            {/* Text */}
            <View style={styles.textContainer}>
              <Text
                style={styles.title}
              >
                {title}
              </Text>
              <Text
                style={styles.description}
              >
                {description}
              </Text>
            </View>
            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('button press')}
            >
              <Text
                style={styles.buttonText}
              >
                {
                  completed ?
                    'Let´s Go'
                  :
                    'Skip'
                }
              </Text>
            </TouchableOpacity>
          </View>
        )))}
      </Animated.ScrollView>
    )
  }

  function renderDots() {

    const dotPosition = Animated.divide(scrollX, SIZES.width)

    return (
      <View
        style={styles.dotContainer}
      >
        { onBoardings.map((item, i) => {

          const opacity = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          })
          const dotSize = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp'
          })

          return (
            <Animated.View
              key={`dot-${i}`}
              opacity={opacity}
              style={[
                styles.dot,
                {
                  width: dotSize,
                  height: dotSize
                }
              ]}
            >

            </Animated.View>
          )
        }) }
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        { renderContent() }
      </View>
      <View
        style={styles.dotsSection}
      >
        { renderDots() }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    position: 'absolute',
    bottom: '10%',
    left: 40,
    right: 40
  },
  title: {
    ...FONTS.h1,
    color: COLORS.gray,
    textAlign: 'center'
  },
  description: {
    ...FONTS.body3,
    marginTop: SIZES.base,
    color: COLORS.gray,
    textAlign: 'center'
  },
  dotsSection: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '25%': '23%'
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2
  },
  button: {
    position: 'absolute',
    backgroundColor: COLORS.blue,
    bottom: 0,
    right: 0,
    width: 150,
    height: 60,
    paddingLeft: 20,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30
  },
  buttonText: {
    ...FONTS.h1,
    color: COLORS.white
  }
})

export default OnBoarding