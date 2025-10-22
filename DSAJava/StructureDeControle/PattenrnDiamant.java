package DSAJava.StructureDeControle;

public class PattenrnDiamant {
    public static void main(String[] args) {
        String patternDiamantCaractere = "abcdefgh";

        int centrageHorizontaleX = patternDiamantCaractere. length() - 1;
        int centrageHorizontaleY = 1 ;
  
        for (int i = 0; i < patternDiamantCaractere.length(); i++) { 

            for (int k = 0; k < centrageHorizontaleX; k++) {
                System.out.print(" ");
            }

            for (int j = 0; j <= i; j++) {

                char car = patternDiamantCaractere.charAt(j);

                System.out.print(car + " ");
            }

            System.out.println();
            centrageHorizontaleX--;  
        }

        for (int i = patternDiamantCaractere.length() - 1; i >= 0; i--) {

            for (int k = 0; k < centrageHorizontaleY; k++) {
                System.out.print(" ");
            }

            for (int j = 0 ; j < i ; j++) {
                    char car = patternDiamantCaractere.charAt(j);

                    System.out.print(car + " ");
            }

            System.out.println(); 
            centrageHorizontaleY++;
        }

    }
}