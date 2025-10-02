package    DSAJava.StructureDeControle;

public class FizzBuzzSimple {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            int div3 = i % 3;
            int div5 = i % 5;

            if ((div3 == 0) && (div5 == 0)) {
                System.out.println("FizzBuzz");
            } else if (div3 == 0) {
                System.out.println("Fuzz");
            } else if ( div5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}
